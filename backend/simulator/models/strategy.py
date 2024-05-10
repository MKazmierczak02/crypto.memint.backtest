from django.db import models
from django.contrib.auth.models import User


class Strategy(models.Model):
    name = models.CharField(max_length=100, verbose_name="Strategy Name")
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="User")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Updated At")
    description = models.TextField(verbose_name="Description")
    active = models.BooleanField(default=True, verbose_name="Active")

    def __str__(self):
        return f"{self.name} by {self.user.username}"
