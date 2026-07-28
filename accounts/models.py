from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Perfil(models.Model):

    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )
    color = models.CharField(
        max_length=20,
        default="azul"
    )
    fondo = models.ImageField(
        upload_to="fondos/",
        null=True,
        blank=True
    )
