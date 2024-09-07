from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import (PriceViewSet, SimulationViewSet, StrategyViewSet,
                    SymbolViewSet, check_analysis_result, start_simulation)

router = SimpleRouter()
router.register(r"strategies", StrategyViewSet, basename="strategies")
router.register(r"pairs", SymbolViewSet, basename="symbols")
router.register(r"simulations", SimulationViewSet, basename="simulations")
router.register(r"prices", PriceViewSet, basename="prices")


urlpatterns = [
    path("start", start_simulation, name="start-simulation"),
    path("check", check_analysis_result, name="check-simulation"),
    path("", include(router.urls)),
]
