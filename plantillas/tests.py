from django.test import TestCase

from .views import construir_recomendaciones_analisis


class RecomendacionesAnalisisTests(TestCase):
    def test_destaca_carga_desigual_y_rechazos(self):
        analisis_usuarios = [
            {
                "usuario__username": "Ana",
                "gestiones": 20,
                "tasa_rechazo": 10,
                "rechazados": 2,
            },
            {
                "usuario__username": "Luis",
                "gestiones": 5,
                "tasa_rechazo": 30,
                "rechazados": 3,
            },
        ]

        recomendaciones = construir_recomendaciones_analisis(
            analisis_usuarios=analisis_usuarios,
            promedio_gestiones_por_usuario=12.5,
            total_gestiones=25,
            total_duplicados=3,
        )

        titulos = [item["titulo"] for item in recomendaciones]

        self.assertIn("Carga desigual entre usuarios", titulos)
        self.assertIn("Revisión de rechazos", titulos)
        self.assertIn("Seguimiento de duplicados", titulos)
