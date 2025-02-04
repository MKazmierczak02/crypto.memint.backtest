# Generated by Django 5.1.1 on 2024-10-07 21:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("simulator", "0016_alter_technicalindicator_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="condition",
            name="constant_value",
        ),
        migrations.RemoveField(
            model_name="condition",
            name="current_price",
        ),
        migrations.RemoveField(
            model_name="condition",
            name="indicator_left",
        ),
        migrations.RemoveField(
            model_name="condition",
            name="indicator_right",
        ),
        migrations.CreateModel(
            name="Operand",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "operand_type",
                    models.CharField(
                        choices=[
                            ("indicator", "Indicator"),
                            ("constant", "Constant"),
                            ("current_price", "Current Price"),
                            ("profit", "Profit"),
                        ],
                        max_length=20,
                    ),
                ),
                ("constant_value", models.FloatField(blank=True, null=True)),
                (
                    "indicator",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="simulator.technicalindicator",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="condition",
            name="left_operand",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="left_conditions",
                to="simulator.operand",
            ),
        ),
        migrations.AddField(
            model_name="condition",
            name="right_operand",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="right_conditions",
                to="simulator.operand",
            ),
        ),
    ]
