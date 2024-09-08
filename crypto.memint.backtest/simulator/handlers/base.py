import math
from abc import ABC, abstractmethod
from decimal import Decimal, InvalidOperation

from django_pandas.io import read_frame

from ..models import PriceData
from .config import INDICATORS


class SimulationHandler(ABC):
    def __init__(self, simulation):
        self.id = simulation.id
        self._simulation = simulation
        self._market_data = self._prepare_market_data_dataframe()

    @abstractmethod
    def run(self):
        pass

    @abstractmethod
    def check_conditions(self, data):
        pass

    def _compare(self, indicator_value, comparison_value, operator):
        if operator == ">=":
            return indicator_value >= comparison_value
        elif operator == "<=":
            return indicator_value <= comparison_value
        elif operator == "==":
            return indicator_value == comparison_value
        elif operator == "<":
            return indicator_value < comparison_value
        elif operator == ">":
            return indicator_value > comparison_value
        return False

    def _calculate_indicators(self, df):
        for col, indicator in INDICATORS.items():
            if df[col].isnull().all():
                df[col] = indicator["func"](df["close"], **indicator["params"])
        return df

    def _prepare_market_data_dataframe(self):
        price_data = PriceData.objects.filter(
            pair=self._simulation.symbol, timeframe=self._simulation.timeframe
        ).order_by("timestamp")

        df = read_frame(price_data)

        df = self._calculate_indicators(df)
        # self._update_price_data(df)

        return df

    def _update_price_data(self, df):
        price_data_to_update = PriceData.objects.filter(id__in=list(df.id))

        for price_obj in price_data_to_update:
            i = price_obj.id
            for indicator in INDICATORS.keys():
                value = df.loc[df.id == i, indicator].values[0]
                if value is None:
                    continue
                setattr(price_obj, indicator, value if not math.isnan(value) else None)

        PriceData.objects.bulk_update(price_data_to_update, INDICATORS.keys())

    def _are_valid_indicator_values(self, *args):
        """
        Helper function to check if all values are valid (not None or NaN).
        """
        for value in args:
            if value is None:
                return False
            try:
                if isinstance(value, Decimal) and value.is_nan():
                    return False
            except (InvalidOperation, AttributeError):
                return False
        return True
