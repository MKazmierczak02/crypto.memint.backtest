from django.db import models

from .symbol import Symbol
from .timeframe import TimeFrame


class Simulation(models.Model):
    STATUS_CHOICES = [
        ("Stopped", "Stopped"),
        ("Ready", "Ready"),
        ("Running", "Running"),
        ("Finished", "Finished"),
    ]
    strategy = models.ForeignKey("Strategy", on_delete=models.CASCADE)
    symbol = models.ForeignKey(
        Symbol, related_name="simulations", on_delete=models.CASCADE
    )
    transactions = models.ManyToManyField("Transaction", blank=True)
    timeframe = models.ForeignKey(TimeFrame, on_delete=models.CASCADE)

    data_start_date = models.DateField(null=True, blank=True)
    data_end_date = models.DateField(null=True, blank=True)

    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)

    initial_balance = models.FloatField()
    fixed_trade_value = models.FloatField(blank=True, null=True)
    available_assets = models.FloatField(blank=True, null=True)

    final_balance = models.FloatField(blank=True, null=True)
    roi = models.FloatField(blank=True, null=True)
    max_drawdown = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS_CHOICES, default="Ready")
    task_id = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"#{self.id} | Simulation of {self.strategy.name}"

    def save(self, *args, **kwargs):
        if not self.fixed_trade_value:
            self.fixed_trade_value = self.initial_balance * 0.10

        if not self.available_assets:
            self.available_assets = self.initial_balance

        super().save(*args, **kwargs)

    def add_transaction(self, transaction):
        if not self.transactions.filter(
            transaction_type=transaction.transaction_type,
            date=transaction.date,
            amount=transaction.amount,
            price=transaction.price,
            total=transaction.total
        ).exists():
            self.transactions.add(transaction)
            self.save()
        else:
            print("Transaction already exists in this simulation.")

    def update_holdings(self, action_type, amount):
        if action_type == "BUY":
            self.available_assets += amount
        elif action_type == "SELL":
            self.available_assets -= amount
        self.save()

    def clear_transactions(self):
        self.transactions.clear()
        self.save()

