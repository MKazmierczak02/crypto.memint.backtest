from django.db import models
from django.utils import timezone
from django_pandas.io import read_frame

from .price import PriceData
from .portfolio import Portfolio


class Simulation(models.Model):
    STATUS_CHOICES = [
        ("Stopped", "Stopped"),
        ("Ready", "Ready"),
        ("Running", "Running"),
        ("Finished", "Finished"),
    ]
    strategy = models.ForeignKey("Strategy", on_delete=models.CASCADE)
    symbol = models.ForeignKey(
        "Symbol", related_name="simulations", on_delete=models.CASCADE
    )
    timeframe = models.ForeignKey("TimeFrame", on_delete=models.CASCADE)
    data_from = models.DateField(null=True, blank=True)
    data_to = models.DateField(null=True, blank=True)
    leverage = models.PositiveIntegerField(default=1)

    initial_balance = models.DecimalField(max_digits=20, decimal_places=2)
    fixed_trade_value = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    final_balance = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    roi = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    max_drawdown = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    max_loss = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    max_positions = models.PositiveSmallIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="Ready")
    task_id = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"#{self.id} | Simulation of {self.strategy.name}"

    def run(self):
        portfolio = Portfolio(
            initial_cash=self.initial_balance,
            simulation=self,
            fixed_trade_value=self.fixed_trade_value,
            max_positions=self.max_positions
        )
        try:
            data = self._prepare_market_dataframe()
            if data.empty:
                raise ValueError("No historical data available for the specified date range.")
            self._calculate_indicators(data)
            self.set_running()
            for idx in range(len(data)):
                current_row = data.iloc[idx]
                current_price = current_row['close']
                current_timestamp = current_row.name
                portfolio.update_positions(current_price, current_timestamp)

                for condition_group in self.strategy.condition_groups.all():
                    if self.evaluate_condition_group(condition_group, data, idx):
                        action = condition_group.action
                        action.execute(portfolio, current_row)
            self.set_finished(portfolio)
        except Exception as e:
            self.set_stopped()
            raise e

    def calculate_results(self, portfolio):
        self.final_balance = self.initial_balance + portfolio.get_total_profit()
        self.roi = ((self.final_balance - self.initial_balance) / self.initial_balance) * 100
        self.max_drawdown = portfolio.calculate_max_drawdown()
        self.save()

    def set_running(self):
        self.status = "Running"
        self.start_date = timezone.now()
        self.save()

    def set_finished(self, portfolio):
        self.status = "Finished"
        self.end_date = timezone.now()
        self.calculate_results(portfolio)
        self.save()

    def set_stopped(self):
        self.status = "Stopped"
        self.save()

    def evaluate_condition_group(self, condition_group, data, idx) -> bool:
        conditions = list(condition_group.conditions.order_by('order'))
        if not conditions:
            return False

        result = conditions[0].evaluate(data, idx)
        for condition in conditions[1:]:
            condition_result = condition.evaluate(data, idx)
            logical_operator = condition.logical_operator
            if logical_operator == 'AND' or logical_operator == 'NONE':
                result = result and condition_result
            elif logical_operator == 'OR':
                result = result or condition_result
        return result

    def _prepare_market_dataframe(self):
        filter_criteria = {
            'pair': self.symbol,
            'timeframe': self.timeframe,
        }

        if self.data_from:
            filter_criteria['timestamp__gte'] = self.data_from
        if self.data_to:
            filter_criteria['timestamp__lte'] = self.data_to

        historical_data_qs = PriceData.objects.filter(
            **filter_criteria
        ).order_by("timestamp")

        historical_data = read_frame(
            historical_data_qs,
            fieldnames=['timestamp', 'open', 'high', 'low', 'close', 'volume'],
            index_col='timestamp'
        )
        return historical_data

    def _calculate_indicators(self, data):
        indicators = set()
        for condition_group in self.strategy.condition_groups.all():
            for condition in condition_group.conditions.all():
                indicators.add(condition.indicator_left)
                if condition.indicator_right:
                    indicators.add(condition.indicator_right)
        for indicator in indicators:
            column_name = indicator.get_column_name()
            if column_name not in data.columns:
                indicator_series = indicator.calculate(data)
                data[column_name] = indicator_series
