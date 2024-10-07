from django.db import models
from .operand import Operand
from .condition_group import ConditionGroup


class Condition(models.Model):
    LOGICAL_OPERATORS = [
        ('AND', 'AND'),
        ('OR', 'OR'),
        ('NONE', 'NONE'),
    ]
    CONDITION_OPERATORS = [
        ('GT', '>'),
        ('LT', '<'),
        ('EQ', '=='),
        ('GTE', '>='),
        ('LTE', '<='),
        ('NEQ', '!='),
        ('XAB', 'Crosses Above'),
        ('XBE', 'Crosses Below'),
    ]
    condition_group = models.ForeignKey(ConditionGroup, related_name='conditions', on_delete=models.CASCADE, null=True)
    left_operand = models.ForeignKey(Operand, on_delete=models.CASCADE, related_name='left_conditions', null=True)
    operator = models.CharField(max_length=10, choices=CONDITION_OPERATORS)
    right_operand = models.ForeignKey(Operand, on_delete=models.CASCADE, related_name='right_conditions', null=True)
    logical_operator = models.CharField(max_length=4, choices=LOGICAL_OPERATORS, default='AND')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def evaluate(self, data, idx, context) -> bool:
        left_value = self.left_operand.get_value(data, idx, context)
        right_value = self.right_operand.get_value(data, idx, context)

        if left_value is None or right_value is None:
            return False

        if self.operator in ['GT', 'LT', 'EQ', 'GTE', 'LTE', 'NEQ']:
            return self.evaluate_common_logic(left_value, right_value)
        elif self.operator == 'XAB':
            if idx == 0:
                return False
            left_previous = self.left_operand.get_value(data, idx - 1, context)
            right_previous = self.right_operand.get_value(data, idx - 1, context)
            if left_previous is None or right_previous is None:
                return False
            return left_previous <= right_previous and left_value > right_value
        elif self.operator == 'XBE':
            if idx == 0:
                return False
            left_previous = self.left_operand.get_value(data, idx - 1, context)
            right_previous = self.right_operand.get_value(data, idx - 1, context)
            if left_previous is None or right_previous is None:
                return False
            return left_previous >= right_previous and left_value < right_value
        else:
            return False

    def evaluate_common_logic(self, left_value, right_value):
        if self.operator == 'GT':
            return left_value > right_value
        elif self.operator == 'LT':
            return left_value < right_value
        elif self.operator == 'EQ':
            return left_value == right_value
        elif self.operator == 'GTE':
            return left_value >= right_value
        elif self.operator == 'LTE':
            return left_value <= right_value
        elif self.operator == 'NEQ':
            return left_value != right_value
        else:
            return False

    def __str__(self):
        return f"{self.left_operand} {self.operator} {self.right_operand}"
