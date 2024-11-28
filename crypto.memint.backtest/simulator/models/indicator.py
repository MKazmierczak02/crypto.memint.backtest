import pandas as pd
import pandas_ta as ta
from django.db import models

INDICATOR_FUNCTIONS = {
    "SMA": ta.sma,
    "EMA": ta.ema,
    "RSI": ta.rsi,
    "MACD": ta.macd,
    "MACD_HIST": ta.macd,
    "BBANDS": ta.bbands,
    "ADX": ta.adx,
    "STOCH": ta.stoch,
    "CCI": ta.cci,
    "ATR": ta.atr,
    "MFI": ta.mfi
}


class TechnicalIndicator(models.Model):
    AVAILABLE_PARAMETERS = {
        "SMA": ["length"],
        "EMA": ["length"],
        "RSI": ["length", "overbought", "oversold"],
        "MACD": ["fast", "slow", "signal"],
        "MACD_HIST": ["fast", "slow", "signal"],
        "BBANDS_LOWER": ["length", "std_dev"],
        "BBANDS_MIDDLE": ["length", "std_dev"],
        "BBANDS_UPPER": ["length", "std_dev"],
        "ADX": ["length"],
        "STOCH": ["k", "d"],
        "CCI": ["length"],
        "ATR": ["length"],
        "MFI": ["length"],
    }

    INDICATOR_CHOICES = [
        ("SMA", "Simple Moving Average"),
        ("EMA", "Exponential Moving Average"),
        ("RSI", "Relative Strength Index"),
        ("MACD", "Moving Average Convergence Divergence"),
        ("BBANDS_LOWER", "Bollinger Bands Lower Band"),
        ("BBANDS_MIDDLE", "Bollinger Bands Middle Band"),
        ("BBANDS_UPPER", "Bollinger Bands Upper Band"),
        ("ADX", "Average Directional Index"),
        ("MFI", "Money Flow Index")
    ]

    name = models.CharField(
        max_length=20, choices=INDICATOR_CHOICES, null=True, blank=True
    )
    parameters = models.JSONField(
        null=True, blank=True
    )  # parameters like period lengths, etc.

    def __str__(self):
        if self.parameters and self.name:
            params = ", ".join([f"{k}={v}" for k, v in self.parameters.items()])
            return f"{self.get_name_display()} ({params})"
        elif self.name:
            return self.get_name_display()
        else:
            return ""

    def validate_parameters(self):
        allowed_params = self.AVAILABLE_PARAMETERS.get(self.name)
        if not allowed_params:
            raise ValueError(f"Indicator {self.name} is not available.")

        for param in self.parameters.keys():
            if param not in allowed_params:
                raise ValueError(
                    f"Parameter for indicator {self.name}: {param} is not allowed."
                )

    def calculate(self, data):
        self.validate_parameters()
        base_indicator_name = self.get_base_indicator_name()

        indicator_func = INDICATOR_FUNCTIONS.get(base_indicator_name)
        if not indicator_func:
            raise ValueError(f"Indicator {base_indicator_name} is not supported.")
        params = self.parameters.copy()
        column_name = self.get_column_name()

        if base_indicator_name == "ADX" or base_indicator_name == "ATR" or base_indicator_name == "CCI":
            indicator_series = indicator_func(data["high"], data["low"], data["close"], **params)
        elif base_indicator_name == "STOCH":
            indicator_series = indicator_func(data["high"], data["low"], data["close"], **params)
        elif base_indicator_name == "MACD":
            indicator_series = indicator_func(data["close"], **params)
        elif base_indicator_name == "MFI":
            indicator_series = indicator_func(data["high"], data["low"], data["close"], data["volume"], **params)
        else:
            indicator_series = indicator_func(data["close"], **params)

        if isinstance(indicator_series, pd.DataFrame):
            output_series_name = self.get_output_series_name()
            if output_series_name in indicator_series.columns:
                data[column_name] = indicator_series[output_series_name]
            else:
                raise ValueError(f"Output {output_series_name} not found in the result of {base_indicator_name}")
        elif isinstance(indicator_series, pd.Series):
            data[column_name] = indicator_series
        else:
            raise ValueError(f"Unexpected return type from indicator {self.name}")

    def get_column_name(self):
        params_str = "_".join(f"{k}{v}" for k, v in sorted(self.parameters.items()))
        return f"{self.name}_{params_str}"

    def get_base_indicator_name(self):
        if self.name.startswith("BBANDS"):
            return "BBANDS"
        elif self.name.startswith("MACD_HIST"):
            return "MACD"
        else:
            return self.name

    def get_output_series_name(self):
        output_series_mapping = {
            "BBANDS_LOWER": "BBL",
            "BBANDS_MIDDLE": "BBM",
            "BBANDS_UPPER": "BBU",
            "MACD": "MACD_12_26_9",
            "MACD_HIST": "MACDh_12_26_9",
            "ADX": f"ADX_{self.parameters.get('length', 14)}",
            "STOCH": "%K",
            "CCI": f"CCI_{self.parameters.get('length', 20)}",
            "ATR": f"ATR_{self.parameters.get('length', 14)}",
        }
        return output_series_mapping.get(self.name, self.name)
