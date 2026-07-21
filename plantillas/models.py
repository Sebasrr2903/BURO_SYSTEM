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

    distribuidor = models.CharField(
        max_length=200,
        default='SIN DISTRIBUIDOR'
    )

    respuesta = models.TextField()

    def __str__(self):
        return f"{self.gestion} - {self.nombre_cliente}"


class Preset(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=120)
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_fin = models.DateField(null=True, blank=True)
    hora_inicio = models.TimeField(null=True, blank=True)
    hora_fin = models.TimeField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} ({self.user.username})"