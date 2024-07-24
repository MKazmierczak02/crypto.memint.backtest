from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import permissions
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView



urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/simulator/", include("simulator.urls"), name="simulator"),
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name='api-schema'), name="api-docs"),
]
