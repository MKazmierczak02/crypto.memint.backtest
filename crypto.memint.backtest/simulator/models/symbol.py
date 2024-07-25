from django.db import models


class Symbol(models.Model):
    crypto = models.CharField(max_length=50, verbose_name="Cryptocurrency")
    vs_currency = models.CharField(max_length=50, verbose_name="Versus Currency")

    class Meta:
        unique_together = ('crypto', 'vs_currency')

    def __str__(self):
        return f"{self.crypto}{self.vs_currency}"
