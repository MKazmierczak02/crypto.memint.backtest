from django.contrib import admin

from .models import (
    Condition,
    Position,
    PriceData,
    Simulation,
    Strategy,
    Symbol,
    TimeFrame,
    SimulationResult,
    ConditionGroup,
    Action,
    TechnicalIndicator,
    Operand
)

admin.site.register(Position)
admin.site.register(Simulation)
admin.site.register(SimulationResult)
admin.site.register(Strategy)
admin.site.register(TechnicalIndicator)
admin.site.register(TimeFrame)
admin.site.register(PriceData)
admin.site.register(Symbol)
admin.site.register(ConditionGroup)
admin.site.register(Action)
admin.site.register(Condition)
admin.site.register(Operand)
