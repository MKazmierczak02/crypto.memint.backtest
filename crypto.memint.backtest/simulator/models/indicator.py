import pandas_ta as ta
from django.db import models

INDICATOR_FUNCTIONS = {
    "SMA": ta.sma,
    "EMA": ta.ema,
    "RSI": ta.rsi,
    "MACD": ta.macd,
    "BBANDS": ta.bbands,
    "ADX": ta.adx,
}


class TechnicalIndicator(models.Model):
    AVAILABLE_PARAMETERS = {
        "SMA": ["length"],
        "EMA": ["length"],
        "RSI": ["length", "overbought", "oversold"],
        "MACD": [],
        "BBANDS_LOWER": ["length", "std_dev"],
        "BBANDS_MIDDLE": ["length", "std_dev"],
        "BBANDS_UPPER": ["length", "std_dev"],
        "ADX": ["length"],
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

        if self.name in ["BBANDS_LOWER", "BBANDS_MIDDLE", "BBANDS_UPPER"]:
            indicator_func = INDICATOR_FUNCTIONS.get("BBANDS")
            params = self.parameters.copy()
            bbands = indicator_func(data["close"], **params)
            data["BBANDS_LOWER"] = bbands["BBL"]
            data["BBANDS_MIDDLE"] = bbands["BBM"]
            data["BBANDS_UPPER"] = bbands["BBU"]
            return data[self.name]
        else:
            indicator_func = INDICATOR_FUNCTIONS.get(self.name)
            if not indicator_func:
                raise ValueError(f"Indicator {self.name} is not supported.")

            params = self.parameters.copy()
            if self.name == "MACD":
                indicator_series = indicator_func(data["close"], **params)
                return indicator_series["MACD"]
            elif self.name == "ADX":
                indicator_series = indicator_func(
                    data["high"], data["low"], data["close"], **params
                )
                return indicator_series
            else:
                indicator_series = indicator_func(data["close"], **params)
                return indicator_series

    def get_column_name(self):
        params = "_".join(f"{k}{v}" for k, v in self.parameters.items())
        return f"{self.name}_{params}"
