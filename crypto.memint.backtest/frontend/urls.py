from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    path("login", TemplateView.as_view(template_name="index.html"), name="index"),
    path("signup", TemplateView.as_view(template_name="index.html"), name="index"),
]
