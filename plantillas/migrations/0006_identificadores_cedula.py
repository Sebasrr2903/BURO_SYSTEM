from django.db import migrations, models


def separar_identificadores(apps, schema_editor):
    PlantillaGenerada = apps.get_model("plantillas", "PlantillaGenerada")

    pendientes = []
    for registro in PlantillaGenerada.objects.only("pk", "cedula").iterator(
        chunk_size=2000
    ):
        partes = [
            parte.strip()
            for parte in (registro.cedula or "").split("/", 1)
        ]
        registro.cedula_busqueda_1 = partes[0]
        registro.cedula_busqueda_2 = (
            partes[1] if len(partes) > 1 else ""
        )
        pendientes.append(registro)

        if len(pendientes) == 2000:
            PlantillaGenerada.objects.bulk_update(
                pendientes,
                ["cedula_busqueda_1", "cedula_busqueda_2"],
                batch_size=2000,
            )
            pendientes.clear()

    if pendientes:
        PlantillaGenerada.objects.bulk_update(
            pendientes,
            ["cedula_busqueda_1", "cedula_busqueda_2"],
            batch_size=2000,
        )


class Migration(migrations.Migration):

    dependencies = [
        ("plantillas", "0005_plantillagenerada_cedula_fecha_index"),
    ]

    operations = [
        migrations.AddField(
            model_name="plantillagenerada",
            name="cedula_busqueda_1",
            field=models.CharField(
                blank=True,
                default="",
                editable=False,
                max_length=50,
            ),
        ),
        migrations.AddField(
            model_name="plantillagenerada",
            name="cedula_busqueda_2",
            field=models.CharField(
                blank=True,
                default="",
                editable=False,
                max_length=50,
            ),
        ),
        migrations.RunPython(
            separar_identificadores,
            migrations.RunPython.noop,
        ),
        migrations.AddIndex(
            model_name="plantillagenerada",
            index=models.Index(
                fields=["cedula_busqueda_1"],
                name="plant_cedula_1_idx",
            ),
        ),
        migrations.AddIndex(
            model_name="plantillagenerada",
            index=models.Index(
                fields=["cedula_busqueda_2"],
                name="plant_cedula_2_idx",
            ),
        ),
    ]
