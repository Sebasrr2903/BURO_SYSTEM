from django.contrib import admin
from .models import PlantillaGenerada


@admin.register(PlantillaGenerada)
class PlantillaGeneradaAdmin(admin.ModelAdmin):

    list_display = (
    'fecha',
    'usuario',
    'gestion',
    'nombre_cliente',
    'cedula',
    'resultado'
    )

    search_fields = (
        'gestion',
        'cedula',
        'nombre_cliente'
    )