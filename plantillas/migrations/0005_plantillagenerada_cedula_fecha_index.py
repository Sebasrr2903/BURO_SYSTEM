from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("plantillas", "0004_create_preset"),
    ]

    operations = [
        migrations.AddIndex(
            model_name="plantillagenerada",
            index=models.Index(
                fields=["cedula", "-fecha"],
                name="plant_cedula_fecha_idx",
            ),
        ),
    ]
