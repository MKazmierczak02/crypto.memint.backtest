from django.db import models


class ConditionGroup(models.Model):
    strategy = models.ForeignKey("Strategy", related_name='condition_groups', on_delete=models.CASCADE)
    action = models.ForeignKey("Action", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Condition Group {self.id} for {self.strategy.name}"
