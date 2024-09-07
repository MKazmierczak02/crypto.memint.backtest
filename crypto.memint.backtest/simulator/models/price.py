from django.db import models

from .symbol import Symbol
from .timeframe import TimeFrame


class PriceData(models.Model):
    pair = models.ForeignKey(Symbol, on_delete=models.CASCADE)
    timeframe = models.ForeignKey(TimeFrame, on_delete=models.CASCADE)

    timestamp = models.DateTimeField()
    open = models.DecimalField(max_digits=20, decimal_places=10)
    high = models.DecimalField(max_digits=20, decimal_places=10)
    low = models.DecimalField(max_digits=20, decimal_places=10)
    close = models.DecimalField(max_digits=20, decimal_places=10)
    volume = models.DecimalField(max_digits=30, decimal_places=10)

    # technical indicators:
    sma_20 = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )
    sma_50 = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )
    sma_100 = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )
    sma_200 = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )

    ema_20 = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )
    rsi_14 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    macd = models.DecimalField(max_digits=20, decimal_places=10, null=True, blank=True)
    macd_signal = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )
    bollinger_upper = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )
    bollinger_lower = models.DecimalField(
        max_digits=20, decimal_places=10, null=True, blank=True
    )

    class Meta:
        unique_together = ("pair", "timeframe", "timestamp")
        indexes = [
            models.Index(fields=["pair", "timeframe", "timestamp"]),
        ]

    def __str__(self):
        return f"{self.pair} - {self.timeframe} @ {self.timestamp}"
