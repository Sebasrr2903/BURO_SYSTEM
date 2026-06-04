from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse, JsonResponse
from openpyxl import Workbook
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import PlantillaGenerada
from django.contrib.auth.models import User
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

        registro_existente = PlantillaGenerada.objects.filter(
            cedula=data.get("cedula")
        ).order_by('-fecha').first()

        if registro_existente and not data.get("forzar"):

            return JsonResponse({
                "existe": True,
                "fecha": registro_existente.fecha.strftime("%d/%m/%Y %H:%M"),
                "usuario": registro_existente.usuario.username,
                "resultado": registro_existente.resultado,
                "respuesta": registro_existente.respuesta,
            })

        PlantillaGenerada.objects.create(
            usuario=request.user,
            gestion=data.get("gestion"),
            distribuidor=data.get("distribuidor"),
            cedula=data.get("cedula"),
            nombre_cliente=data.get("nombre_cliente"),
            nombre_plantilla=data.get("nombre_plantilla"),
            resultado=data.get("resultado"),
            respuesta=data.get("respuesta")
        )

        return JsonResponse({"success": True})

    return JsonResponse({"success": False})


from django.db.models import Q
from django.core.paginator import Paginator


@login_required
def historial(request):

    registros = PlantillaGenerada.objects.all().order_by('-fecha')

    busqueda = request.GET.get('q')
    usuario = request.GET.get('usuario')
    resultado = request.GET.get('resultado')
    
    es_admin = request.user.groups.filter(
        name='Admin'
    ).exists()

 

    fecha_inicio = request.GET.get('fecha_inicio')
    fecha_fin = request.GET.get('fecha_fin')

    if busqueda:
        registros = registros.filter(
            Q(gestion__icontains=busqueda) |
            Q(nombre_cliente__icontains=busqueda) |
            Q(cedula__icontains=busqueda)
        )

    if usuario:
             registros = registros.filter(
             usuario__username=usuario
        )
    if resultado:
             registros = registros.filter(
             resultado=resultado
    )

    if fecha_inicio:
        registros = registros.filter(
            fecha__date__gte=fecha_inicio
        )

    if fecha_fin:
        registros = registros.filter(
            fecha__date__lte=fecha_fin
        )

    

    total = registros.count()

    procede = registros.filter(
        resultado="PROCEDE"
    ).count()

    no_procede = registros.filter(
        resultado="NO PROCEDE"
    ).count()

    rechazados = registros.exclude(
    resultado__in=["PROCEDE", "NO PROCEDE"]
    ).count()

    # PAGINACIÓN AL FINAL
    paginator = Paginator(registros, 10)

    page_number = request.GET.get('page')

    registros = paginator.get_page(page_number)

    usuarios = User.objects.order_by('username')

    if es_admin:
        usuarios = User.objects.exclude(
            is_superuser=True
        ).order_by('username')
    else:
        usuarios = User.objects.filter(
            id=request.user.id
    )



    return render(
        request,
        'historial.html',
        {
            'registros': registros,
            'es_admin': es_admin,
            'resultado_seleccionado': resultado,
            'total': total,
            'procede': procede,
            'no_procede': no_procede,
            'rechazados': rechazados,
            'busqueda': busqueda,
            'fecha_inicio': fecha_inicio,
            'fecha_fin': fecha_fin,
            'usuarios': usuarios,
            'usuario_seleccionado': usuario,
        }
    )

@login_required
def exportar_excel(request):

    wb = Workbook()
    ws = wb.active

    ws.title = "Historial"

    ws.append([
        "Fecha",
        "Usuario",
        "Gestión",
        "Cliente",
        "Cédula",
        "Resultado",
        "Respuesta"
    ])

    registros = PlantillaGenerada.objects.all().order_by('-fecha')

    fecha_inicio = request.GET.get('fecha_inicio')
    fecha_fin = request.GET.get('fecha_fin')

    if fecha_inicio:
        registros = registros.filter(
            fecha__date__gte=fecha_inicio
        )

    if fecha_fin:
        registros = registros.filter(
            fecha__date__lte=fecha_fin
        )

    for registro in registros:

        ws.append([
            registro.fecha.strftime("%d/%m/%Y %H:%M"),
            registro.usuario.username if registro.usuario else "",
            registro.gestion,
            registro.nombre_cliente,
            registro.cedula,
            registro.resultado,
            registro.respuesta
        ])

    ws.column_dimensions['G'].width = 120

    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    response[
        'Content-Disposition'
    ] = 'attachment; filename=historial.xlsx'

    wb.save(response)

    return response



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

@login_required
def eliminar_usuario(request, user_id):

    if not request.user.groups.filter(
        name='Admin'
    ).exists():

        return redirect('/')

    usuario = get_object_or_404(
        User,
        id=user_id
    )

    # Evitar borrarse a sí mismo
    if usuario == request.user:
        return redirect('/crear-usuario/')

    usuario.delete()

    return redirect('/crear-usuario/')