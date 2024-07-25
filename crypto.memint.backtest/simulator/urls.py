from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import StrategyViewSet, SymbolViewSet, SimulationViewSet, PriceViewSet, start_simulation, stop_simulation

router = SimpleRouter()
router.register(r'strategies', StrategyViewSet, basename='strategies')
router.register(r'symbols', SymbolViewSet, basename='symbols')
router.register(r'simulations', SimulationViewSet, basename='simulations')
router.register(r'prices', PriceViewSet, basename='prices')


urlpatterns = [
    path('start', start_simulation, name='start-simulation'),
    path('stop', stop_simulation, name='stop-simulation'),
    path('', include(router.urls)),
]
