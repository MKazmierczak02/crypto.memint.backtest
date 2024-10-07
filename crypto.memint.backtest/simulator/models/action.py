from django.db import models


class Action(models.Model):
    ACTION_PARAMETERS = {
        "BUY": ["amount"],
        "SELL": ["amount"],
        "HOLD": [],
        "SET_STOP_LOSS": ["price", "percent"],
        "SET_TAKE_PROFIT": ["price", "percent"],
    }
    ACTION_CHOICES = [
        ("BUY", "Buy"),
        ("SELL", "Sell"),
        ("HOLD", "Hold"),
        ("SET_STOP_LOSS", "Set Stop Loss"),
        ("SET_TAKE_PROFIT", "Set Take Profit"),
    ]
    action_type = models.CharField(max_length=20, choices=ACTION_CHOICES)
    parameters = models.JSONField(null=True, blank=True, default=dict)

    def __str__(self):
        if self.parameters:
            params = ", ".join([f"{k}={v}" for k, v in self.parameters.items()])
            return f"{self.get_action_type_display()} ({params})"
        return f"{self.get_action_type_display()}"

    def execute(self, portfolio, data_row):
        price = data_row["close"]
        date = data_row.name
        simulation = portfolio.simulation
        fixed_trade_value = simulation.fixed_trade_value or portfolio.cash_balance
        leverage = simulation.leverage or 1

        if self.action_type == "BUY":
            amount = self.parameters.get("amount")
            size = (
                amount if amount is not None else fixed_trade_value * leverage / price
            )
            if portfolio.get_current_position_count() >= simulation.max_positions:
                return
            portfolio.open_position(
                size=size,
                entry_price=price,
                entry_timestamp=date,
                position_type="long",
                leverage=leverage,
            )

        elif self.action_type == "SELL":
            amount = self.parameters.get("amount")
            positions_long = [
                p
                for p in portfolio.positions
                if p.symbol == simulation.symbol
                and not p.is_closed
                and p.position_type == "long"
            ]
            if positions_long:
                if amount is not None:
                    amount_to_close = amount
                    for position in positions_long:
                        if amount_to_close <= 0:
                            break
                        position_size = position.size
                        if position_size <= amount_to_close:
                            portfolio.close_position(
                                position=position,
                                close_price=price,
                                close_timestamp=date,
                            )
                            amount_to_close -= position_size
                        else:
                            portfolio.close_position(
                                position=position,
                                close_price=price,
                                close_timestamp=date,
                                size=amount_to_close,
                            )
                            amount_to_close = 0
                else:
                    for position in positions_long:
                        portfolio.close_position(
                            position=position, close_price=price, close_timestamp=date
                        )

        elif self.action_type == "HOLD":
            pass

        elif self.action_type in ["SET_STOP_LOSS", "SET_TAKE_PROFIT"]:
            price_value = self.parameters.get("price")
            percent_value = self.parameters.get("percent")
            if price_value is None and percent_value is None:
                raise ValueError(
                    f"{self.action_type} action requires 'price' or 'percent' parameter"
                )
            positions = [
                p
                for p in portfolio.positions
                if p.symbol == simulation.symbol and not p.is_closed
            ]
            for position in positions:
                if price_value is not None:
                    method = getattr(position, f"set_{self.action_type.lower()}_price")
                    method(price_value)
                elif percent_value is not None:
                    method = getattr(
                        position, f"set_{self.action_type.lower()}_percent"
                    )
                    method(percent_value)

        else:
            raise ValueError(f"Unknown action type: {self.action_type}")
