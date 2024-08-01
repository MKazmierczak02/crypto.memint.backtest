from django.db import models


class Action(models.Model):
    ACTION_CHOICES = [
        ('BUY', 'Buy'),
        ('SELL', 'Sell'),
    ]

    action_type = models.CharField(max_length=10, choices=ACTION_CHOICES)
    amount = models.FloatField()

    def __str__(self):
        return f"{self.action_type} {self.amount}"
