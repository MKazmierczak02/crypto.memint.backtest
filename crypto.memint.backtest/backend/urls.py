from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import health_check

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("frontend.urls"), name="frontend"),
    path("api/simulator/", include("simulator.urls"), name="simulator"),
    path("api/", include("core.urls"), name="core"),
    path("api/check", health_check, name="health_check"),
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name='api-schema'), name="api-docs"),
]
