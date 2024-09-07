# Generated by Django 4.2.16 on 2024-09-04 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("simulator", "0015_alter_condition_comparison_indicator_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="condition",
            name="crossover_direction",
            field=models.CharField(
                blank=True,
                choices=[("UP", "Crossover Up"), ("DOWN", "Crossover Down")],
                max_length=4,
                null=True,
            ),
        ),
    ]
