from django.db import models
from django.contrib.auth.models import User


class Strategy(models.Model):
    name = models.CharField(max_length=100, verbose_name="Strategy Name")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="User")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    description = models.TextField(verbose_name="Description")
    strategy_definition = models.JSONField(verbose_name="Strategy Definition")
    # example
    # {
    #     "buy_conditions": [
    #         {"name": "MA_50_above_MA_200", "operator": ">", "value": "MA_50,MA_200"}
    #     ],
    #     "sell_conditions": [
    #         {"name": "price_crosses_below_MA_50", "operator": "<", "value": "price,MA_50"}
    #     ]
    # }

    def __str__(self):
        return f"{self.name} by {self.user.username}"
