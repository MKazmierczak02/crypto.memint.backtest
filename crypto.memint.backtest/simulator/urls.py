from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import (
    StrategyViewSet,
    SymbolViewSet,
    SimulationViewSet,
    PriceViewSet,
    start_simulation,
    check_analysis_result
)

router = SimpleRouter()
router.register(r'strategies', StrategyViewSet, basename='strategies')
router.register(r'symbols', SymbolViewSet, basename='symbols')
router.register(r'simulations', SimulationViewSet, basename='simulations')
router.register(r'prices', PriceViewSet, basename='prices')


urlpatterns = [
    path('start', start_simulation, name='start-simulation'),
    path('check', check_analysis_result, name='check-simulation'),
    path('', include(router.urls)),
]
