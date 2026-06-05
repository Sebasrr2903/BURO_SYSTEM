from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'), 
    path(
    'limpiar-historial/',
    views.limpiar_historial,
    name='limpiar_historial'
),
path(
    'exportar-excel/',
    views.exportar_excel,
    name='exportar_excel'
),
path(
    'verificar-cedula/',
    views.verificar_cedula,
    name='verificar_cedula'
),

path(
    'ultima-gestion/',
    views.ultima_gestion,
    name='ultima_gestion'
),

path(
    'eliminar-usuario/<int:user_id>/',
    views.eliminar_usuario,
    name='eliminar_usuario'
),

path(
    'limpiar-por-fecha/',
    views.limpiar_por_fecha,
    name='limpiar_por_fecha'
),

    path(
        'historial/',
        views.historial,
        name='historial'
    ),

    path(
        'guardar-plantilla/',
        views.guardar_plantilla,
        name='guardar_plantilla'
    ),
]

