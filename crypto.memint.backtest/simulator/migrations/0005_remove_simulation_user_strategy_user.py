# Generated by Django 4.2.14 on 2024-08-26 15:50

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("simulator", "0004_alter_simulation_transactions"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="simulation",
            name="user",
        ),
        migrations.AddField(
            model_name="strategy",
            name="user",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
    ]
