from django.contrib import admin
from .models import Simulation, Symbol, Strategy, PriceData

admin.site.register(Simulation)
admin.site.register(Symbol)
admin.site.register(Strategy)
admin.site.register(PriceData)
