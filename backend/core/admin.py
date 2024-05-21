from django.contrib import admin  # noqa
from django.contrib.auth import get_user_model

admin.site.register(get_user_model())
