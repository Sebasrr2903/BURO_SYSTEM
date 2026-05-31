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

