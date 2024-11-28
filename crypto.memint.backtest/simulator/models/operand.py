from django.db import models

from .indicator import TechnicalIndicator


class Operand(models.Model):
    OPERAND_TYPE_CHOICES = [
        ("indicator", "Indicator"),
        ("constant", "Constant"),
        ("current_price", "Current Price"),
        ("profit", "Profit"),
    ]
    operand_type = models.CharField(max_length=20, choices=OPERAND_TYPE_CHOICES)
    indicator = models.ForeignKey(
        TechnicalIndicator, on_delete=models.CASCADE, null=True, blank=True
    )
    constant_value = models.FloatField(null=True, blank=True)

    def get_value(self, data, idx, context):
        if self.operand_type == "indicator" and self.indicator:
            return self._get_indicator_value(self.indicator, data, idx)
        elif self.operand_type == "constant":
            return self.constant_value
        elif self.operand_type == "current_price":
            return context["current_price"]
        elif self.operand_type == "profit":
            return context["profit"]
        else:
            return None

    def _get_indicator_value(self, indicator, data, idx):
        column_name = indicator.get_column_name()
        return data[column_name].iloc[idx]

    def __str__(self):
        if self.operand_type == "indicator" and self.indicator:
            return str(self.indicator)
        elif self.operand_type == "constant":
            return str(self.constant_value)
        elif self.operand_type == "current_price":
            return "Current Price"
        elif self.operand_type == "profit":
            return "Profit"
        else:
            return "Unknown Operand"
