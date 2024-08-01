from django.db import models


class Strategy(models.Model):
    name = models.CharField(max_length=100, verbose_name="Strategy Name")
    description = models.TextField(blank=True, null=True)
    parameters = models.JSONField(default=dict)  # example: {"macd_threshold": 100, "rsi_threshold": 30, "buy_amount": 1, "sell_amount": 0.5}
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    conditions = models.ManyToManyField('Condition')
    actions = models.ManyToManyField('Action')

    def __str__(self):
        return self.name
