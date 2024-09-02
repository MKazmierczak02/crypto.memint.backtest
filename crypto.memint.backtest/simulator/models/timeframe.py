from django.db import models


class TimeFrame(models.Model):
    timeframe_id = models.CharField(max_length=10, primary_key=True)
    description = models.CharField(max_length=50)

    def __str__(self):
        return self.description
