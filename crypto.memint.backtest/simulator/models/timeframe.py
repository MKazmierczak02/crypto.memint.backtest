from django.db import models
from binance.client import Client

BINANCE_MAPPINGS = {
    "1m": Client.KLINE_INTERVAL_1MINUTE,
    "5m": Client.KLINE_INTERVAL_5MINUTE,
    "30m": Client.KLINE_INTERVAL_30MINUTE,
    "1h": Client.KLINE_INTERVAL_1HOUR,
    "4h": Client.KLINE_INTERVAL_4HOUR,
    "1d": Client.KLINE_INTERVAL_1DAY,
    "1w": Client.KLINE_INTERVAL_1WEEK,
    "1mo": Client.KLINE_INTERVAL_1MONTH,
}


class TimeFrame(models.Model):
    timeframe_id = models.CharField(max_length=10, primary_key=True)
    description = models.CharField(max_length=50)

    def __str__(self):
        return self.description

    def to_binance_interval(self):
        return BINANCE_MAPPINGS.get(self.timeframe_id, Client.KLINE_INTERVAL_1DAY)
