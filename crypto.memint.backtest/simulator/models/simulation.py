from django.db import models

from .symbol import Symbol


class Simulation(models.Model):
    STATUS_CHOICES = [
        ("Stopped", "Stopped"),
        ("Ready", "Ready"),
        ("Running", "Running"),
        ("Finished", "Finished"),
    ]
    strategy = models.ForeignKey(
        "Strategy", on_delete=models.CASCADE
    )  # Strategia używana w symulacji
    symbol = models.OneToOneField(
        Symbol, related_name="simulations", on_delete=models.CASCADE
    )
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    initial_balance = models.FloatField()
    final_balance = models.FloatField(blank=True, null=True)
    roi = models.FloatField(blank=True, null=True)
    max_drawdown = models.FloatField(blank=True, null=True)
    transactions = models.ManyToManyField("Transaction", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=STATUS_CHOICES, default="Ready")
    task_id = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"#{self.id} | Simulation of {self.strategy.name} from {self.start_date} to {self.end_date}"
