from django.db import models
from .symbol import Symbol


class Simulation(models.Model):
    strategy = models.ForeignKey('Strategy', on_delete=models.CASCADE)
    symbols = models.ManyToManyField(Symbol, related_name='simulations')
    start_date = models.DateField()
    end_date = models.DateField()
    initial_capital = models.DecimalField(max_digits=14, decimal_places=2)
    final_capital = models.DecimalField(max_digits=14, decimal_places=2)
    profit_loss = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    performance_metrics = models.JSONField(null=True, blank=True)

    def __str__(self):
        return (f"#{self.id} - {self.start_date} - {self.end_date} |"
                f" Strategy: {self.strategy.name} | symbols {self.symbols}")
