# Generated by Django 5.1.1 on 2024-09-29 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("simulator", "0011_alter_condition_options_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="position",
            name="entry_price",
            field=models.DecimalField(decimal_places=10, max_digits=20),
        ),
        migrations.AlterField(
            model_name="position",
            name="size",
            field=models.DecimalField(decimal_places=10, max_digits=20),
        ),
    ]
