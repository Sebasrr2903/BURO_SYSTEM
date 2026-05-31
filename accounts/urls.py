from django.urls import path
from .views import cambiar_password, crear_usuario, editar_usuario, login_view, logout_view, toggle_usuario

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('crear-usuario/', crear_usuario, name='crear_usuario'),
    path('toggle-usuario/<int:user_id>/',toggle_usuario,name='toggle_usuario'),
    path('cambiar-password/<int:user_id>/', cambiar_password, name='cambiar_password'),
    path(
    'editar-usuario/<int:user_id>/',
    editar_usuario,
    name='editar_usuario'
),
]