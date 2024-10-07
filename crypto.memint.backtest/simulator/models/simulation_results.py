from django.db import models


class SimulationResult(models.Model):
    simulation = models.ForeignKey("Simulation", related_name='results', on_delete=models.CASCADE)
    date = models.DateField()
    portfolio_value = models.DecimalField(max_digits=20, decimal_places=2)
    cash = models.DecimalField(max_digits=20, decimal_places=2)
