from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Perfil(models.Model):

    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    fondo = models.ImageField(
        upload_to="fondos/",
        blank=True,
        null=True
    )
    color = models.CharField(
        max_length=20,
        default="azul"
    )

    foto = models.ImageField(
        upload_to="perfiles/",
        blank=True,
        null=True
    )