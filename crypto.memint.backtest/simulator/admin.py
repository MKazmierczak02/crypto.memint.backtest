from django.contrib import admin
from .models import Simulation, Symbol, Strategy, PriceData, Condition, Transaction, Action

admin.site.register(Simulation)
admin.site.register(Symbol)
admin.site.register(Strategy)
admin.site.register(PriceData)
admin.site.register(Condition)
admin.site.register(Transaction)
admin.site.register(Action)
