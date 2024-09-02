from django.db import models

from .simulation import Simulation


class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ("BUY", "Buy"),
        ("SELL", "Sell"),
    ]
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    date = models.DateTimeField()
    amount = models.FloatField()
    price = models.FloatField()
    total = models.FloatField()

    def __str__(self):
        return f"{self.transaction_type} on {self.date} - Amount: {self.amount} at Price: {self.price}"
