from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from .models import Perfil


class ActualizarPerfilTests(TestCase):
    def test_usuario_puede_restaurar_fondo_predeterminado(self):
        usuario = User.objects.create_user(
            username="usuario-fondo",
            password="clave-segura",
        )
        perfil = Perfil.objects.create(
            usuario=usuario,
            fondo="fondos/fondo-anterior.jpg",
        )
        self.client.force_login(usuario)

        respuesta = self.client.post(
            reverse("actualizar_perfil"),
            {
                "color": "azul",
                "usar_fondo_default": "on",
            },
        )

        perfil.refresh_from_db()
        self.assertRedirects(respuesta, "/")
        self.assertFalse(perfil.fondo)
