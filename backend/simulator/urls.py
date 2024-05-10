from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import StrategyViewSet

router = SimpleRouter()
router.register(r'strategies', StrategyViewSet, basename='strategies')

urlpatterns = [
    path('', include(router.urls)),
]
