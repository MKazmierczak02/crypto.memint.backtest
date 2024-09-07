import pandas_ta as ta

INDICATORS = {
    "sma_20": {"func": ta.sma, "params": {"length": 20}},
    "sma_50": {"func": ta.sma, "params": {"length": 50}},
    "sma_100": {"func": ta.sma, "params": {"length": 100}},
    "sma_200": {"func": ta.sma, "params": {"length": 200}},
}
