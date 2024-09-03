# Generated by Django 4.2.16 on 2024-09-03 21:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('simulator', '0012_remove_technicalindicator_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pricedata',
            name='technical_indicator',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='simulator.technicalindicator'),
        ),
    ]
