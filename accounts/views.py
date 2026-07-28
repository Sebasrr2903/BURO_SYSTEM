from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from django.contrib import messages
from django.utils.http import url_has_allowed_host_and_scheme

def login_view(request):

    error = None

    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user:
            login(request, user)
            return redirect('/')

        error = "Usuario o contraseña incorrectos"

    return render(
        request,
        'login.html',
        {
            'error': error
        }
    )
    
    
from .models import Perfil

@login_required
def actualizar_perfil(request):

    perfil, creado = Perfil.objects.get_or_create(
        usuario=request.user
    )

    if request.method == "POST":
        
        perfil.color = request.POST.get(
                "color",
                "azul"
        )

        if request.POST.get("usar_fondo_default") == "on":
            fondo_anterior = perfil.fondo
            perfil.fondo = None
            perfil.save()
            if fondo_anterior:
                fondo_anterior.delete(save=False)
            messages.success(
                request,
                "Se restauró el fondo predeterminado."
            )
            return _volver_a_pagina_anterior(request)

        fondo = request.FILES.get("fondo")
        if fondo:
            tipos_permitidos = {
                "image/jpeg",
                "image/png",
                "image/webp",
            }
            if fondo.content_type not in tipos_permitidos:
                messages.error(
                    request,
                    "El fondo debe estar en formato JPG, PNG o WEBP."
                )
            elif fondo.size > 5 * 1024 * 1024:
                messages.error(
                    request,
                    "El fondo no puede superar los 5 MB."
                )
            else:
                fondo_anterior = perfil.fondo
                perfil.fondo = fondo
                perfil.save()
                if fondo_anterior and fondo_anterior.name != perfil.fondo.name:
                    fondo_anterior.delete(save=False)
                messages.success(request, "Perfil actualizado correctamente.")
                return _volver_a_pagina_anterior(request)

        perfil.save()

    return _volver_a_pagina_anterior(request)


def _volver_a_pagina_anterior(request):
    destino = request.META.get("HTTP_REFERER", "")
    if url_has_allowed_host_and_scheme(
        destino,
        allowed_hosts={request.get_host()},
        require_https=request.is_secure(),
    ):
        return redirect(destino)
    return redirect("/")



@login_required
def crear_usuario(request):

    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')
        rol = request.POST.get('rol')

        user = User.objects.create_user(
            username=username,
            password=password
        )

        grupo = Group.objects.get(name=rol)

        user.groups.add(grupo)

        return redirect('/crear-usuario/')

    query = request.GET.get('q', '').strip()
    usuarios = User.objects.all()

    if query:
        usuarios = usuarios.filter(
            Q(username__icontains=query) |
            Q(groups__name__icontains=query)
        ).distinct()

    usuarios = usuarios.order_by('username')

    return render(
        request,
        'crear_usuario.html',
        {
            'usuarios': usuarios,
            'query': query
        }
    )


from django.shortcuts import get_object_or_404

@login_required
def toggle_usuario(request, user_id):

    usuario = get_object_or_404(
        User,
        id=user_id
    )

    usuario.is_active = not usuario.is_active

    usuario.save()

    return redirect('/crear-usuario/')


@login_required
def cambiar_password(request, user_id):

    usuario = get_object_or_404(
        User,
        id=user_id
    )

    if request.method == 'POST':

        nueva_password = request.POST.get(
            'password'
        )

        usuario.set_password(
            nueva_password
        )

        usuario.save()

        return redirect('/crear-usuario/')

    return render(
        request,
        'cambiar_password.html',
        {
            'usuario': usuario
        }
    )

from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404, redirect

@login_required
def editar_usuario(request, user_id):

    usuario = get_object_or_404(
        User,
        id=user_id
    )

    if request.method == 'POST':

        usuario.username = request.POST.get(
            'username'
        )

        nueva_password = request.POST.get(
            'password'
        )

        rol = request.POST.get(
            'rol'
        )

        if nueva_password:
            usuario.set_password(
                nueva_password
            )

        usuario.groups.clear()

        grupo = Group.objects.get(
            name=rol
        )

        usuario.groups.add(
            grupo
        )

        usuario.save()

        return redirect(
            '/crear-usuario/'
        )
    

    
def logout_view(request):
    logout(request)
    return redirect('/login/')

