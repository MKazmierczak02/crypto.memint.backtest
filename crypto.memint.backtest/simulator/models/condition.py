from django.db import models


class Condition(models.Model):
    CONDITION_CHOICES = [
        ("MACD", "MACD"),
        ("PRICE", "Price"),
        ("RSI", "RSI"),
    ]

    OPERATOR_CHOICES = [
        (">=", "Greater than or equal to"),
        ("<=", "Less than or equal to"),
        ("==", "Equal to"),
        ("<", "Less than"),
        (">", "Greater than"),
    ]

    indicator = models.CharField(max_length=50, choices=CONDITION_CHOICES)
    operator = models.CharField(max_length=2, choices=OPERATOR_CHOICES)
    value = models.FloatField()
    join_operator = models.CharField(
        max_length=3, choices=[("AND", "AND"), ("OR", "OR")], default="AND"
    )

    def __str__(self):
        return f"{self.indicator} {self.operator} {self.value}"
