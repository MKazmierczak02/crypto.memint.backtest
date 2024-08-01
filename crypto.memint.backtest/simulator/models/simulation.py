from django.db import models
from django.db.models.fields.related import ForeignKey
from django.contrib.auth import get_user_model
from .symbol import Symbol


class Simulation(models.Model):
    user = ForeignKey(get_user_model(), on_delete=models.CASCADE)
    strategy = models.ForeignKey("Strategy", on_delete=models.CASCADE)  # Strategia używana w symulacji
    symbol = models.OneToOneField(Symbol, related_name="simulations", on_delete=models.CASCADE)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    initial_balance = models.FloatField()
    final_balance = models.FloatField(blank=True, null=True)
    roi = models.FloatField(blank=True, null=True)
    max_drawdown = models.FloatField(blank=True, null=True)
    transactions = models.ManyToManyField('Transaction')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"#{self.id} | Simulation of {self.strategy.name} from {self.start_date} to {self.end_date}"
