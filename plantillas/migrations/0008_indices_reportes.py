from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("plantillas", "0007_normalizar_separadores_cedula"),
    ]

    operations = [
        migrations.AddIndex(
            model_name="plantillagenerada",
            index=models.Index(
                fields=["-fecha"],
                name="plant_fecha_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="plantillagenerada",
            index=models.Index(
                fields=["distribuidor", "cedula"],
                name="plant_dist_cedula_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="plantillagenerada",
            index=models.Index(
                fields=["resultado", "-fecha"],
                name="plant_result_fecha_idx",
            ),
        ),
    ]
