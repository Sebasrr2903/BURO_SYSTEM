from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse, JsonResponse
from openpyxl import Workbook
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timezone
from django.utils import timezone
from urllib3 import request
from .models import PlantillaGenerada
from django.db.models.functions import TruncDate
from django.contrib.auth.models import User
import json

from .models import PlantillaGenerada

@login_required
def inicio(request):
    return render(request, 'index.html')



@login_required
def verificar_cedula(request):

    cedula = request.GET.get('cedula', '').strip()

    historial = PlantillaGenerada.objects.filter(
            cedula__icontains=cedula
    ).order_by('-fecha')

    registro = historial.first()

    if registro:

        return JsonResponse({
            "existe": True,
            "fecha": timezone.localtime(
                registro.fecha
            ).strftime("%d/%m/%Y %H:%M"),
            "usuario": registro.usuario.username,
            "cedula": registro.cedula,
            "nombre_cliente": registro.nombre_cliente,
            "resultado": registro.resultado,
            "distribuidor": registro.distribuidor,
            "respuesta": registro.respuesta,
            "total": historial.count(),

            "historial": [
                {
                    "fecha": timezone.localtime(
                        r.fecha
                    ).strftime("%d/%m/%Y %H:%M"),

                    "usuario": r.usuario.username,
                    "resultado": r.resultado,
                    "distribuidor": r.distribuidor,
                    "respuesta": r.respuesta

                }
                for r in historial[:10]
            ]
        })

    return JsonResponse({
        "existe": False
    })


@csrf_exempt
def guardar_plantilla(request):



    if request.method == "POST":

        data = json.loads(request.body)

        print("ENTRE A GUARDAR")
        print(data)
    
        
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


from django.db.models import Q, Count, Max
from django.core.paginator import Paginator


@login_required
def historial(request):

    registros = PlantillaGenerada.objects.all().order_by('-fecha')

    busqueda = request.GET.get('q')
    usuario = request.GET.get('usuario')
    distribuidor = request.GET.get('distribuidor')
    resultado = request.GET.get('resultado')

    fecha_inicio = request.GET.get('fecha_inicio')
    fecha_fin = request.GET.get('fecha_fin')

    if busqueda:
        registros = registros.filter(
            Q(gestion__icontains=busqueda) |
            Q(nombre_cliente__icontains=busqueda) |
            Q(cedula__icontains=busqueda)
        )

    if distribuidor:
         registros = registros.filter(
        distribuidor__icontains=distribuidor
    )

    if usuario:
             registros = registros.filter(
             usuario__username=usuario
        )
             
             
    
    if resultado == "RECHAZADOS":

            registros = registros.exclude(
                resultado__in=[
                    "PROCEDE",
                    "NO PROCEDE"
                ]
            )

    elif resultado:

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
    limite = request.GET.get('limite', 10)

    paginator = Paginator(
        registros,
        int(limite)
    )

    page_number = request.GET.get('page')

    registros = paginator.get_page(
        page_number
    )
    usuarios = User.objects.order_by('username')

    return render(
        request,
        'historial.html',
        {
            'registros': registros,
            'distribuidor': distribuidor,
            'resultado': resultado,
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
        "Distribuidor", 
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
            timezone.localtime(
            registro.fecha).strftime("%d/%m/%Y %H:%M"),
            registro.usuario.username if registro.usuario else "",
            registro.gestion,
            registro.nombre_cliente,
            registro.cedula,
            registro.resultado,
            registro.distribuidor,
            registro.respuesta
        ])

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
def ultima_gestion(request):

    registro = PlantillaGenerada.objects.filter(
        usuario=request.user
    ).order_by('-fecha').first()

    if not registro:
        return JsonResponse({
            "success": False
        })

    datos = {
        "success": True,
        "distribuidor": registro.distribuidor,
        "gestion": registro.gestion,
        "cedula": registro.cedula,
        "nombre_cliente": registro.nombre_cliente,
        "plantilla": registro.nombre_plantilla,
        "resultado": registro.resultado,
        "respuesta": registro.respuesta,
    }

    registro.delete()

    return JsonResponse(datos)


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





from .models import PlantillaGenerada


@login_required
def reportes(request):

    # =====================================================
    # FILTROS
    # =====================================================

    fecha_inicio = request.GET.get("fecha_inicio")
    fecha_fin = request.GET.get("fecha_fin")

    usuario = request.GET.get("usuario")
    resultado = request.GET.get("resultado")
    distribuidor = request.GET.get("distribuidor")


    # =====================================================
    # QUERYSET BASE
    # =====================================================

    registros = PlantillaGenerada.objects.all()


    # =====================================================
    # APLICAR FILTROS
    # =====================================================

    if fecha_inicio:
        registros = registros.filter(
            fecha__date__gte=fecha_inicio
        )

    if fecha_fin:
        registros = registros.filter(
            fecha__date__lte=fecha_fin
        )

    if usuario:
        registros = registros.filter(
            usuario__username=usuario
        )

    if resultado:
        if resultado == "RECHAZADOS":

            registros = registros.exclude(
                resultado__in=[
                    "PROCEDE",
                    "NO PROCEDE"
                ]
            )

        else:

            registros = registros.filter(
                resultado=resultado
            )

    if distribuidor:
        registros = registros.filter(
            distribuidor=distribuidor
        )


    # =====================================================
    # CÉDULAS CON MÚLTIPLES GESTIONES
    # SOLO DEL PERÍODO FILTRADO
    # =====================================================

    duplicados = (
        registros
        .exclude(cedula="")
        .values(
            "cedula",
            "nombre_cliente"
        )
        .annotate(
            total=Count("id")
        )
        .filter(
            total__gt=1
        )
        .order_by("-total")[:20]
    )


    # =====================================================
    # ESTADOS
    # =====================================================

    procede = registros.filter(
        resultado="PROCEDE"
    ).count()

    no_procede = registros.filter(
        resultado="NO PROCEDE"
    ).count()

    rechazados = registros.exclude(
        resultado__in=[
            "PROCEDE",
            "NO PROCEDE"
        ]
    ).count()


    estados_json = [
        procede,
        no_procede,
        rechazados
    ]


    # =====================================================
    # GESTIONES POR DÍA
    # =====================================================

    gestiones_dia = (
        registros
        .annotate(
            dia=TruncDate("fecha")
        )
        .values("dia")
        .annotate(
            total=Count("id")
        )
        .order_by("dia")
    )


    datos_dia = [
        {
            "dia": (
                g["dia"].strftime("%d/%m/%Y")
                if g["dia"]
                else ""
            ),
            "total": g["total"]
        }
        for g in gestiones_dia
    ]


    # =====================================================
    # USUARIOS CON MÁS GESTIONES
    # =====================================================

    usuarios = (
        registros
        .values("usuario__username")
        .annotate(
            total=Count("id")
        )
        .order_by("-total")[:10]
    )

    # =====================================================
    # ANÁLISIS POR USUARIO (seguro para plantilla)
    # =====================================================

    analisis_qs = (
        registros
        .values("usuario__id", "usuario__username")
        .annotate(
            gestiones=Count("id"),
            procede=Count("id", filter=Q(resultado="PROCEDE")),
            no_procede=Count("id", filter=Q(resultado="NO PROCEDE")),
            rechazados=Count("id", filter=~Q(resultado__in=["PROCEDE", "NO PROCEDE"]))
        )
        .order_by("-gestiones", "usuario__username")
    )

    analisis_usuarios = list(analisis_qs)

    for u in analisis_usuarios:
        total = u.get("gestiones") or 0
        u["tasa_procede"] = round((u.get("procede", 0) / total) * 100, 1) if total else 0
        u["tasa_rechazo"] = round((u.get("rechazados", 0) / total) * 100, 1) if total else 0

    registros_count = registros.count()
    promedio_gestiones_por_usuario = round(registros_count / len(analisis_usuarios), 1) if analisis_usuarios else 0

    usuario_mas_activo = analisis_usuarios[0] if analisis_usuarios else None

    usuario_mas_rechazos = None
    if analisis_usuarios:
        usuario_mas_rechazos = max(analisis_usuarios, key=lambda item: (item.get("tasa_rechazo", 0), item.get("rechazados", 0)))

    recomendaciones_analisis = []
    if usuario_mas_activo:
        recomendaciones_analisis.append({
            "titulo": "Usuario con más actividad",
            "descripcion": (
                f"{usuario_mas_activo.get('usuario__username') or 'Sin usuario'} concentra {usuario_mas_activo.get('gestiones', 0)} gestiones en este período."
            ),
        })

    if usuario_mas_rechazos and usuario_mas_rechazos.get("gestiones"):
        recomendaciones_analisis.append({
            "titulo": "Revisión de rechazos",
            "descripcion": (
                f"{usuario_mas_rechazos.get('usuario__username') or 'Sin usuario'} tiene {usuario_mas_rechazos.get('tasa_rechazo', 0)}% de rechazos, ideal para revisar calidad o procesos."
            ),
        })

    recomendaciones_analisis.append({
        "titulo": "Equilibrio de carga",
        "descripcion": "Compara la carga entre usuarios para detectar si alguno trabaja por encima de la media y repartir mejor las gestiones.",
    })

    recomendaciones_analisis.append({
        "titulo": "Seguimiento de desempeño",
        "descripcion": "Monitorea semanalmente los usuarios con mayor volumen y los que muestran más rechazos para mejorar la productividad.",
    })


    # =====================================================
    # DISTRIBUIDORES CON MÁS GESTIONES
    # =====================================================

    distribuidores = (
        registros
        .exclude(distribuidor="")
        .values("distribuidor")
        .annotate(
            total=Count("id")
        )
        .order_by("-total")[:10]
    )


    # =====================================================
    # PLANTILLAS MÁS UTILIZADAS
    # =====================================================

    plantillas = (
        registros
        .values("nombre_plantilla")
        .annotate(
            total=Count("id")
        )
        .order_by("-total")[:10]
    )


    # =====================================================
    # INCONSISTENCIAS
    # POR AHORA DESACTIVADO
    # =====================================================

    inconsistencias = []


    # =====================================================
    # KPIs
    # =====================================================

    total_gestiones = registros.count()

    total_usuarios = (
        registros
        .values("usuario")
        .distinct()
        .count()
    )

    total_distribuidores = (
        registros
        .exclude(distribuidor="")
        .values("distribuidor")
        .distinct()
        .count()
    )

    total_plantillas = (
        registros
        .values("nombre_plantilla")
        .distinct()
        .count()
    )

    lista_usuarios = User.objects.order_by("username")

    lista_distribuidores = (
        PlantillaGenerada.objects
        .exclude(distribuidor="")
        .exclude(distribuidor__isnull=True)
        .values_list("distribuidor", flat=True)
        .distinct()
        .order_by("distribuidor")
    )


    ultimas_gestiones = (
        registros
        .select_related("usuario")
        .order_by("-fecha")[:20]
    )


    duplicados = (
    registros
    .exclude(cedula="")
    .exclude(cedula__isnull=True)
    .values("cedula", "nombre_cliente")
    .annotate(
        total=Count("id"),
        ultima_fecha=Max("fecha"),
        total_usuarios=Count("usuario", distinct=True),
    )
    .filter(total__gt=1)
    .order_by("-total")[:50]
)



    # =====================================================
    # RENDER
    # =====================================================

    return render(
        request,
        "reportes.html",
        {
            "duplicados": duplicados,
            "usuarios": usuarios,
            "analisis_usuarios": analisis_usuarios,
            "recomendaciones_analisis": recomendaciones_analisis,
            "promedio_gestiones_por_usuario": promedio_gestiones_por_usuario,
            "usuario_mas_activo": usuario_mas_activo,
            "distribuidores": distribuidores,
            "plantillas": plantillas,
            "inconsistencias": inconsistencias,

            "estados": estados_json,

            "procede": procede,
            "no_procede": no_procede,
            "rechazados": rechazados,

            "gestiones_dia": datos_dia,
            "ultimas_gestiones": ultimas_gestiones,

            "total_gestiones": total_gestiones,
            "total_usuarios": total_usuarios,
            "total_distribuidores": total_distribuidores,
            "total_plantillas": total_plantillas,
            "lista_usuarios": lista_usuarios,
            "lista_distribuidores": lista_distribuidores,

            # Mantener filtros
            "fecha_inicio": fecha_inicio,
            "fecha_fin": fecha_fin,
            "usuario_seleccionado": usuario,
            "resultado_seleccionado": resultado,
            "distribuidor_seleccionado": distribuidor,
        }
    )

   