from decimal import Decimal

from django.db import models


class Position(models.Model):
    STATUS_CHOICES = [
        ("open", "Open"),
        ("closed", "Closed"),
    ]
    POSITION_TYPE_CHOICES = [
        ("long", "Long"),
        ("short", "Short"),
    ]
    simulation = models.ForeignKey(
        "Simulation", related_name="positions", on_delete=models.CASCADE
    )
    symbol = models.ForeignKey("Symbol", on_delete=models.CASCADE)
    size = models.DecimalField(
        max_digits=20, decimal_places=10, blank=False, null=False
    )
    entry_price = models.DecimalField(
        max_digits=20, decimal_places=10, blank=False, null=False
    )
    position_type = models.CharField(
        max_length=5, choices=POSITION_TYPE_CHOICES, default="long"
    )
    leverage = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal("1.0")
    )
    fee = models.DecimalField(
        max_digits=20,
        decimal_places=10,
        blank=False,
        null=False,
        default=Decimal("0.0"),
    )
    entry_timestamp = models.DateTimeField()
    # Stop Loss and Take Profit levels
    stop_loss_price = models.DecimalField(
        max_digits=20, decimal_places=10, blank=True, null=True
    )
    stop_loss_percent = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )
    take_profit_price = models.DecimalField(
        max_digits=20, decimal_places=10, blank=True, null=True
    )
    take_profit_percent = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="open")
    close_price = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, default=None
    )
    close_timestamp = models.DateTimeField(null=True, default=None)
    realized_profit = models.DecimalField(
        max_digits=20, decimal_places=10, default=Decimal("0.0")
    )
    unrealized_profit = models.DecimalField(
        max_digits=20, decimal_places=10, default=Decimal("0.0")
    )
    total_profit = models.DecimalField(
        max_digits=20, decimal_places=10, default=Decimal("0.0")
    )

    class Meta:
        unique_together = ("simulation", "entry_timestamp")

    def __str__(self):
        return f"Position #{self.id} for Simulation {self.simulation.id}: Entry Price {self.entry_price}"

    def calculate_profit(self, current_price: Decimal) -> None:
        """
        Calculates the unrealized profit based on the current price.
        """
        if self.status == "open":
            if self.position_type == "long":
                self.unrealized_profit = (
                    (current_price - self.entry_price) * self.size * self.leverage
                ) - self.fee
            elif self.position_type == "short":
                self.unrealized_profit = (
                    (self.entry_price - current_price) * self.size * self.leverage
                ) - self.fee
            self.total_profit = self.realized_profit + self.unrealized_profit

    def close_position(
        self, close_price: Decimal, close_timestamp, close_size: Decimal = None
    ) -> None:
        """
        Closes the position completely or partially.
        """
        self.calculate_profit(close_price)
        if close_size is None or close_size >= self.size:
            # Close the entire position
            self.realized_profit += self.unrealized_profit
            self.total_profit = self.realized_profit
            self.close_price = close_price
            self.close_timestamp = close_timestamp
            self.size = Decimal("0.0")
            self.unrealized_profit = Decimal("0.0")
            self.status = "closed"
            self.save()
        else:
            # Partial close
            if close_size > self.size:
                raise ValueError("Cannot close more than the current position size.")
            proportion = close_size / self.size
            partial_realized_profit = self.unrealized_profit * proportion
            self.realized_profit += partial_realized_profit
            self.size -= close_size
            self.unrealized_profit -= partial_realized_profit
            self.total_profit = self.realized_profit + self.unrealized_profit
            if self.size == Decimal("0.0"):
                self.close_price = close_price
                self.close_timestamp = close_timestamp
                self.status = "closed"
            self.save()

    def set_stop_loss_price(self, price: Decimal):
        self.stop_loss_price = Decimal(price)
        self.stop_loss_percent = None  # Clear percent if price is set
        self.save(update_fields=["stop_loss_price", "stop_loss_percent"])

    def set_stop_loss_percent(self, percent: Decimal):
        self.stop_loss_percent = Decimal(percent)
        if self.position_type == "long":
            self.stop_loss_price = self.entry_price * (
                1 - self.stop_loss_percent / Decimal("100")
            )
        elif self.position_type == "short":
            self.stop_loss_price = self.entry_price * (
                1 + self.stop_loss_percent / Decimal("100")
            )
        self.save(update_fields=["stop_loss_price", "stop_loss_percent"])

    def set_take_profit_price(self, price: Decimal):
        self.take_profit_price = Decimal(price)
        self.take_profit_percent = None  # Clear percent if price is set
        self.save(update_fields=["take_profit_price", "take_profit_percent"])

    def set_take_profit_percent(self, percent: Decimal):
        self.take_profit_percent = Decimal(percent)
        if self.position_type == "long":
            self.take_profit_price = self.entry_price * (
                1 + self.take_profit_percent / Decimal("100")
            )
        elif self.position_type == "short":
            self.take_profit_price = self.entry_price * (
                1 - self.take_profit_percent / Decimal("100")
            )
        self.save(update_fields=["take_profit_price", "take_profit_percent"])

    @property
    def is_closed(self):
        return self.status == "closed"
