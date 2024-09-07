from __future__ import absolute_import, unicode_literals

import pandas as pd
from celery import shared_task
from core.api_connector.binance.service import BinanceApiHandler

from ..models import PriceData, Symbol, TimeFrame


@shared_task
def fetch_and_save_data(
    symbol: str, timeframe_id: str, start_str: str = "1 Jan, 2017", end_str: str = None
) -> None:
    symbol = Symbol.objects.get(base_currency=symbol)
    timeframe = TimeFrame.objects.get(timeframe_id=timeframe_id)
    handler = BinanceApiHandler()
    klines = handler.get_historical_klines(
        str(symbol), timeframe.to_binance_interval(), start_str, end_str
    )

    df = pd.DataFrame(
        klines,
        columns=[
            "timestamp",
            "open",
            "high",
            "low",
            "close",
            "volume",
            "close_time",
            "quote_asset_volume",
            "number_of_trades",
            "taker_buy_base_asset_volume",
            "taker_buy_quote_asset_volume",
            "ignore",
        ],
    )
    df["timestamp"] = pd.to_datetime(df["timestamp"], unit="ms")
    df["close_time"] = pd.to_datetime(df["close_time"], unit="ms")

    price_data_objects = [
        PriceData(
            pair=symbol,
            timeframe=timeframe,
            timestamp=row["timestamp"],
            open=row["open"],
            high=row["high"],
            low=row["low"],
            close=row["close"],
            volume=row["volume"],
        )
        for _, row in df.iterrows()
    ]
    PriceData.objects.bulk_create(price_data_objects)
