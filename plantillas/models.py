from django.db import models
from django.contrib.auth.models import User


class PlantillaGenerada(models.Model):

    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    fecha = models.DateTimeField(auto_now_add=True)

    gestion = models.CharField(max_length=50)

    cedula = models.CharField(max_length=50)

    nombre_cliente = models.CharField(max_length=200)

    nombre_plantilla = models.CharField(max_length=200)

    resultado = models.CharField(max_length=50)

    respuesta = models.TextField()

    def __str__(self):
        return f"{self.gestion} - {self.nombre_cliente}"