from django.db import models
from django.contrib.auth.models import User
import re


SEPARADOR_CEDULAS = re.compile(r"[/,\-\s]+")


def separar_cedulas(valor):
    return [
        parte.strip().upper()
        for parte in SEPARADOR_CEDULAS.split(valor or "")
        if parte.strip()
    ][:2]


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

    cedula_busqueda_1 = models.CharField(
        max_length=50,
        blank=True,
        default="",
        editable=False,
    )

    cedula_busqueda_2 = models.CharField(
        max_length=50,
        blank=True,
        default="",
        editable=False,
    )

    nombre_cliente = models.CharField(max_length=200)

    nombre_plantilla = models.CharField(max_length=200)

    resultado = models.CharField(max_length=50)

    distribuidor = models.CharField(
        max_length=200,
        default='SIN DISTRIBUIDOR'
    )

    respuesta = models.TextField()

    class Meta:
        indexes = [
            models.Index(
                fields=["cedula", "-fecha"],
                name="plant_cedula_fecha_idx",
            ),
            models.Index(
                fields=["cedula_busqueda_1"],
                name="plant_cedula_1_idx",
            ),
            models.Index(
                fields=["cedula_busqueda_2"],
                name="plant_cedula_2_idx",
            ),
            models.Index(
                fields=["-fecha"],
                name="plant_fecha_idx",
            ),
            models.Index(
                fields=["distribuidor", "cedula"],
                name="plant_dist_cedula_idx",
            ),
            models.Index(
                fields=["resultado", "-fecha"],
                name="plant_result_fecha_idx",
            ),
        ]

    def save(self, *args, **kwargs):
        partes = separar_cedulas(self.cedula)
        self.cedula_busqueda_1 = partes[0] if partes else ""
        self.cedula_busqueda_2 = partes[1] if len(partes) > 1 else ""
        super().save(*args, **kwargs)

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
