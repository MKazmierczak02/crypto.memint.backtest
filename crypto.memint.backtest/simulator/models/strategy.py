from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.fields.related import ForeignKey


class Strategy(models.Model):
    name = models.CharField(max_length=100, verbose_name="Strategy Name")
    user = ForeignKey(get_user_model(), on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    private = models.BooleanField(default=True)

    def __str__(self):
        return self.name
