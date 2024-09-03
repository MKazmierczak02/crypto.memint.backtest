from django.contrib import admin

from simulator.models import (
    Action,
    Condition,
    PriceData,
    Simulation,
    Strategy,
    Symbol,
    TechnicalIndicator,
    TimeFrame,
    Transaction,
)

admin.site.register(Simulation)
admin.site.register(Symbol)
admin.site.register(Strategy)
admin.site.register(PriceData)
admin.site.register(Condition)
admin.site.register(Transaction)
admin.site.register(Action)
admin.site.register(TimeFrame)
admin.site.register(TechnicalIndicator)
