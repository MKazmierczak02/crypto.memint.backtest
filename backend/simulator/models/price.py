from django.db import models
from .symbol import Symbol


class PriceData(models.Model):
    timestamp = models.DateTimeField()
    symbol = models.ForeignKey(Symbol, on_delete=models.CASCADE)
    open_price = models.DecimalField(max_digits=20, decimal_places=10)
    high_price = models.DecimalField(max_digits=20, decimal_places=10)
    low_price = models.DecimalField(max_digits=20, decimal_places=10)
    close_price = models.DecimalField(max_digits=20, decimal_places=10)
    volume = models.DecimalField(max_digits=30, decimal_places=10)

    class Meta:
        unique_together = ('timestamp', 'symbol')
