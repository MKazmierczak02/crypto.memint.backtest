from django.db import models


class Condition(models.Model):
    INDICATORS_CHOICES = [
        ("MACD", "MACD"),
        ("PRICE", "Price"),
        ("RSI", "RSI"),
        ("sma_20", "SMA20"),
        ("sma_50", "SMA50"),
        ("sma_100", "SMA100"),
        ("sma_209", "SMA200"),
    ]
    TYPE_CHOICES = [
        ("BUY", "BUY"),
        ("SELL", "SELL"),
    ]
    OPERATOR_CHOICES = [
        (">=", "Greater than or equal to"),
        ("<=", "Less than or equal to"),
        ("==", "Equal to"),
        ("<", "Less than"),
        (">", "Greater than"),
        ("CROSSOVER", "Crossover"),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    indicator = models.CharField(max_length=50, choices=INDICATORS_CHOICES)
    comparison_indicator = models.CharField(
        max_length=50, choices=INDICATORS_CHOICES, null=True, blank=True
    )
    value = models.FloatField(null=True, blank=True)
    crossover_direction = models.CharField(
        max_length=4,
        choices=[("UP", "Crossover Up"), ("DOWN", "Crossover Down")],
        null=True,
        blank=True,
    )
    operator = models.CharField(max_length=10, choices=OPERATOR_CHOICES)
    join_operator = models.CharField(
        max_length=3, choices=[("AND", "AND"), ("OR", "OR")], default="AND"
    )

    def __str__(self):
        return f"{self.indicator} {self.operator} {self.value if self.value else self.comparison_indicator}"
