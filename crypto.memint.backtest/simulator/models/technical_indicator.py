from django.db import models


class TechnicalIndicator(models.Model):
    sma_20 = models.DecimalField(
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
