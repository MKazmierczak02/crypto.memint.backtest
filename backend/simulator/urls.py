from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import StrategyViewSet, SymbolViewSet, SimulationViewSet, PriceViewSet

router = SimpleRouter()
router.register(r'strategies', StrategyViewSet, basename='strategies')
router.register(r'symbols', SymbolViewSet, basename='symbols')
router.register(r'simulations', SimulationViewSet, basename='simulations')
router.register(r'prices', PriceViewSet, basename='prices')


urlpatterns = [
    path('', include(router.urls)),
]
