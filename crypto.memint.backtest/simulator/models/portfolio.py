from decimal import Decimal

from .position import Position


class Portfolio:
    def __init__(self, initial_cash, fixed_trade_value, simulation, max_positions):
        self.initial_cash = Decimal(initial_cash)
        self.cash = Decimal(initial_cash)
        self.fixed_trade_value = fixed_trade_value
        self.positions = []
        self.closed_positions = []
        self.simulation = simulation
        self.transaction_history = []
        self._max_positions = max_positions

    def open_position(
        self, size, entry_price, entry_timestamp, position_type="long", leverage=1
    ):
        if len(self.positions) >= self._max_positions:
            return False

        trade_value = size * entry_price
        margin_required = trade_value / leverage

        if self.cash >= margin_required:
            self.cash -= margin_required
        else:
            raise ValueError("Niewystarczające środki na otwarcie pozycji")

        position = Position(
            simulation=self.simulation,
            symbol=self.simulation.symbol,
            size=size,
            entry_price=entry_price,
            entry_timestamp=entry_timestamp,
            position_type=position_type,
            leverage=leverage,
            fee=Decimal(0),
        )
        self.positions.append(position)
        self.transaction_history.append(
            {
                "action": "OPEN",
                "symbol": str(self.simulation.symbol),
                "size": size,
                "price": entry_price,
                "timestamp": entry_timestamp,
                "position_type": position_type,
                "leverage": leverage,
            }
        )
        return True

    def close_position(self, position, close_price, close_timestamp, size=None):
        if size is None or size >= position.size:
            # Zamknięcie całej pozycji
            margin_released = (position.size * position.entry_price) / position.leverage
            position.close_position(close_price, close_timestamp)
            self.cash += margin_released + position.realized_profit
            self.positions.remove(position)
            self.closed_positions.append(position)
            self.transaction_history.append(
                {
                    "action": "CLOSE",
                    "symbol": str(position.symbol),
                    "size": position.size,
                    "price": close_price,
                    "timestamp": close_timestamp,
                }
            )
        else:
            partial_margin_released = (size * position.entry_price) / position.leverage
            partial_profit = position.close_partial(size, close_price, close_timestamp)
            self.cash += partial_margin_released + partial_profit
            self.transaction_history.append(
                {
                    "action": "PARTIAL_CLOSE",
                    "symbol": str(position.symbol),
                    "size": size,
                    "price": close_price,
                    "timestamp": close_timestamp,
                }
            )
            if position.size == 0:
                self.positions.remove(position)
                self.closed_positions.append(position)

    def update_positions(self, current_price, current_timestamp):
        for position in self.positions:
            position.calculate_profit(current_price)
            # Sprawdzenie Stop Loss
            if position.stop_loss_price is not None:
                if (
                    position.position_type == "long"
                    and current_price <= position.stop_loss_price
                ) or (
                    position.position_type == "short"
                    and current_price >= position.stop_loss_price
                ):
                    self.close_position(
                        position, position.stop_loss_price, current_timestamp
                    )
                    continue
            # Sprawdzenie Take Profit
            if position.take_profit_price is not None:
                if (
                    position.position_type == "long"
                    and current_price >= position.take_profit_price
                ) or (
                    position.position_type == "short"
                    and current_price <= position.take_profit_price
                ):
                    self.close_position(
                        position, position.take_profit_price, current_timestamp
                    )
                    continue
            if position.unrealized_profit <= self.simulation.max_loss:
                print(
                    f"CLOSING POSITION: {current_timestamp} BECAUSE OF {position.unrealized_profit}"
                )
                self.close_position(position, current_price, current_timestamp)

    def get_total_profit(self):
        total_profit = sum(
            [position.total_profit for position in self.closed_positions]
        )
        return total_profit

    def calculate_max_drawdown(self):
        peak = self.initial_cash
        max_drawdown = 0

        for transaction in self.transaction_history:
            if transaction["action"] in ["CLOSE", "PARTIAL_CLOSE"]:
                current_balance = self.initial_cash + self.get_total_profit()
                if current_balance > peak:
                    peak = current_balance
                else:
                    drawdown = (peak - current_balance) / peak
                    max_drawdown = max(max_drawdown, drawdown)

        return max_drawdown * 100

    def get_current_position_count(self):
        return len(self.positions)
