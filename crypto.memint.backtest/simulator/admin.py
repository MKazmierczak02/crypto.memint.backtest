from django.contrib import admin

from .models import (
    Action,
    Condition,
    ConditionGroup,
    Operand,
    Position,
    PriceData,
    Simulation,
    SimulationResult,
    Strategy,
    Symbol,
    TechnicalIndicator,
    TimeFrame,
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
