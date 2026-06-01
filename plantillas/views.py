from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import PlantillaGenerada
import json

from .models import PlantillaGenerada

@login_required
def inicio(request):
    return render(request, 'index.html')


@csrf_exempt
def guardar_plantilla(request):

    if request.method == "POST":

        data = json.loads(request.body)

        print("ENTRE A GUARDAR")
        print(data)

        PlantillaGenerada.objects.create(
            usuario=request.user,
            gestion=data.get("gestion"),
            cedula=data.get("cedula"),
            nombre_cliente=data.get("nombre_cliente"),
            nombre_plantilla=data.get("nombre_plantilla"),
            resultado=data.get("resultado"),
            respuesta=data.get("respuesta")
        )

        return JsonResponse({"success": True})

    return JsonResponse({"success": False})


from django.db.models import Q
from datetime import datetime

@login_required
def historial(request):

    registros = PlantillaGenerada.objects.all().order_by('-fecha')

    busqueda = request.GET.get('q')

    fecha_inicio = request.GET.get('fecha_inicio')
    fecha_fin = request.GET.get('fecha_fin')

    if busqueda:
        registros = registros.filter(
            Q(gestion__icontains=busqueda) |
            Q(nombre_cliente__icontains=busqueda) |
            Q(cedula__icontains=busqueda)
        )

    if fecha_inicio:
        registros = registros.filter(fecha__date__gte=fecha_inicio)

    if fecha_fin:
        registros = registros.filter(fecha__date__lte=fecha_fin)

    total = registros.count()

    procede = registros.filter(resultado="PROCEDE").count()

    no_procede = registros.filter(resultado="NO PROCEDE").count()

    rechazados = registros.exclude(resultado="PROCEDE").count()

    return render(
        request,
        'historial.html',
        {
            'registros': registros,
            'total': total,
            'procede': procede,
            'no_procede': no_procede,
            'rechazados': rechazados,
            'busqueda': busqueda,
            'fecha_inicio': fecha_inicio,
            'fecha_fin': fecha_fin,
        }
    )

@login_required
def limpiar_historial(request):

    if not request.user.groups.filter(
        name='Admin'
    ).exists():

        return redirect('/')

    PlantillaGenerada.objects.all().delete()

    return redirect('/historial/')


@login_required
def limpiar_por_fecha(request):

    if not request.user.groups.filter(
        name='Admin'
    ).exists():

        return redirect('historial')

    fecha_inicio = request.GET.get('fecha_inicio')
    fecha_fin = request.GET.get('fecha_fin')

    if fecha_inicio and fecha_fin:

        PlantillaGenerada.objects.filter(
            fecha__date__range=[
                fecha_inicio,
                fecha_fin
            ]
        ).delete()

    return redirect('historial')