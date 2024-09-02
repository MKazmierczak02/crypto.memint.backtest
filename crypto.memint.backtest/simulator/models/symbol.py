from django.db import models


class Symbol(models.Model):
    base_currency = models.CharField(max_length=10)
    quote_currency = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.base_currency}/{self.quote_currency}"

    class Meta:
        unique_together = ("base_currency", "quote_currency")
        indexes = [
            models.Index(fields=["base_currency", "quote_currency"]),
        ]
