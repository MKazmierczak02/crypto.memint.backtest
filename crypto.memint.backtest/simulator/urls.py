from django.urls import include, path
from rest_framework.routers import SimpleRouter

from simulator.views import (
    PriceViewSet,
    SimulationViewSet,
    StrategyViewSet,
    SymbolViewSet,
    TimeFrameViewSet,
    check_analysis_result,
    export_simulation_to_csv,
    start_simulation,
    reset_simulation,
    simulation_summary
)
from simulator.views.utils import (
    TechnicalIndicatorListView,
    ActionListView,
    OperandTypesListView
)

router = SimpleRouter()
router.register(r"strategies", StrategyViewSet, basename="strategies")
router.register(r"symbols", SymbolViewSet, basename="symbols")
router.register(r"simulations", SimulationViewSet, basename="simulations")
router.register(r"prices", PriceViewSet, basename="prices")
router.register(r"timeframes", TimeFrameViewSet, basename="timeframes")

util_urls = [
    path('technical-indicators/', TechnicalIndicatorListView.as_view(), name='technical-indicator-list'),
    path('actions/', ActionListView.as_view(), name='action-list'),
    path('operand-types/', OperandTypesListView.as_view(), name='operand-types-list'),
]


urlpatterns = [
    path("start", start_simulation, name="start-simulation"),
    path("check", check_analysis_result, name="check-simulation"),
    path("reset", reset_simulation, name="reset-simulation"),
    path('summary/<int:simulation_id>/', simulation_summary, name='simulation-summary'),
    path("report/<int:simulation_id>/", export_simulation_to_csv, name="export-simulation-csv"),
    path("", include(router.urls)),
] + util_urls
