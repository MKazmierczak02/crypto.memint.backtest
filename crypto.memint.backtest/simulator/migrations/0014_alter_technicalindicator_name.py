# Generated by Django 5.1.1 on 2024-10-02 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("simulator", "0013_simulation_max_loss"),
    ]

    operations = [
        migrations.AlterField(
            model_name="technicalindicator",
            name="name",
            field=models.CharField(
                blank=True,
                choices=[
                    ("SMA", "Simple Moving Average"),
                    ("EMA", "Exponential Moving Average"),
                    ("RSI", "Relative Strength Index"),
                    ("MACD", "Moving Average Convergence Divergence"),
                    ("BBANDS_LOWER", "Bollinger Bands Lower Band"),
                    ("BBANDS_MIDDLE", "Bollinger Bands Middle Band"),
                    ("BBANDS_UPPER", "Bollinger Bands Upper Band"),
                ],
                max_length=20,
                null=True,
            ),
        ),
    ]
