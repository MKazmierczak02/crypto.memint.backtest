from binance import Client


class BinanceApiHandler:
    def __init__(self):
        self.client = Client()

    def get_historical_klines(
        self,
        symbol: str = "BTCUSDT",
        interval=Client.KLINE_INTERVAL_1WEEK,
        start_time: str = None,
        end_time: str = None,
    ):
        """
        (Open time, Open, High, Low, Close, Volume, Close time, Quote asset volume,
        Number of trades, Taker buy base asset volume, Taker buy quote asset volume, Ignore)
        """
        return self.client.get_historical_klines(symbol, interval, start_time, end_time)
