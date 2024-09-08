from simulator.models import Transaction

from .base import SimulationHandler


class MovingAverageCrossoverStrategy(SimulationHandler):

    def run(self):
        for index, row in self._market_data.iterrows():
            action = self.check_conditions(row)
            if action == "buy":
                self.execute_trade(row, "buy")
            elif action == "sell":
                self.execute_trade(row, "sell")

    def check_conditions(self, data):
        conditions = self._simulation.strategy.conditions.all()

        for condition in conditions:
            if not self._are_valid_indicator_values(
                    data[condition.indicator], data[condition.comparison_indicator]
            ):
                continue

            if condition.operator == "CROSSOVER":
                if self._is_crossover(data, condition.indicator, condition.comparison_indicator,
                                      condition.crossover_direction):
                    return "buy" if condition.type == "BUY" else "sell"

        return None

    def _is_crossover(self, current_row, ma_short_col, ma_long_col, direction):
        previous_row = self._market_data.iloc[self._market_data.index.get_loc(current_row.name) - 1]

        ma_short_previous = previous_row[ma_short_col]
        ma_long_previous = previous_row[ma_long_col]
        ma_short_current = current_row[ma_short_col]
        ma_long_current = current_row[ma_long_col]

        if not self._are_valid_indicator_values(ma_short_previous, ma_long_previous, ma_short_current, ma_long_current):
            return False

        if direction == "UP":
            return ma_short_previous < ma_long_previous and ma_short_current > ma_long_current
        elif direction == "DOWN":
            return ma_short_previous > ma_long_previous and ma_short_current < ma_long_current
        return False

    def execute_trade(self, data, action_type):
        current_price = data['close']

        if action_type == "BUY":
            amount_to_trade = self._simulation.fixed_trade_value / current_price
            self._simulation.update_holdings("BUY", amount_to_trade)
            transaction = Transaction(
                transaction_type="BUY",
                date=data.timestamp,
                amount=amount_to_trade,
                price=current_price,
                total=self._simulation.fixed_trade_value
            )
            self._simulation.add_transaction(transaction)
            print(f"Executed BUY trade for {amount_to_trade} units at price {current_price}")

        elif action_type == "SELL":
            if self._simulation.available_assets <= 0:
                print("No assets to sell")
                return

            amount_to_trade = min(self._simulation.available_assets, self._simulation.fixed_trade_value / current_price)
            self._simulation.update_holdings("SELL", amount_to_trade)

            transaction = Transaction(
                transaction_type="SELL",
                date=data.timestamp,
                amount=amount_to_trade,
                price=current_price,
                total=amount_to_trade * current_price
            )
            self._simulation.add_transaction(transaction)
            print(f"Executed SELL trade for {amount_to_trade} units at price {current_price}")
