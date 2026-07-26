import re

from django.db import migrations


SEPARADOR_CEDULAS = re.compile(r"[/,\-\s]+")


def normalizar_identificadores(apps, schema_editor):
    PlantillaGenerada = apps.get_model("plantillas", "PlantillaGenerada")

    pendientes = []
    for registro in PlantillaGenerada.objects.only("pk", "cedula").iterator(
        chunk_size=2000
    ):
        partes = [
            parte.strip().upper()
            for parte in SEPARADOR_CEDULAS.split(registro.cedula or "")
            if parte.strip()
        ][:2]
        registro.cedula_busqueda_1 = partes[0] if partes else ""
        registro.cedula_busqueda_2 = partes[1] if len(partes) > 1 else ""
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
        ("plantillas", "0006_identificadores_cedula"),
    ]

    operations = [
        migrations.RunPython(
            normalizar_identificadores,
            migrations.RunPython.noop,
        ),
    ]
