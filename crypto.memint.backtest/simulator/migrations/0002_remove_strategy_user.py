# Generated by Django 4.2.14 on 2024-07-26 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("simulator", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="strategy",
            name="user",
        ),
    ]
