from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("simulator", "0010_remove_position_initial_size"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="condition",
            options={"ordering": ["order"]},
        ),
        migrations.RemoveField(
            model_name="strategy",
            name="max_positions",
        ),
        migrations.AddField(
            model_name="simulation",
            name="max_positions",
            field=models.PositiveSmallIntegerField(default=1),
        ),
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
