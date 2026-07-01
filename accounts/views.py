from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

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

        if request.FILES.get("foto"):

            perfil.foto = request.FILES["foto"]

        if request.FILES.get("fondo"):

            perfil.fondo = request.FILES["fondo"]
            
            

        perfil.save()

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

    usuarios = User.objects.all().order_by('username')

    return render(
        request,
        'crear_usuario.html',
        {
            'usuarios': usuarios
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

