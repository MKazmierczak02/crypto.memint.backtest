# Generated by Django 5.1.1 on 2024-09-25 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("simulator", "0004_alter_strategycondition_order_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="strategy",
            name="max_positions",
            field=models.PositiveSmallIntegerField(default=1),
        ),
    ]
