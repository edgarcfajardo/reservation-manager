import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Empieza a reservar hoy</h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya optimizaron su tiempo y aumentaron sus ingresos con Cita Manager
          </p>
          <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 text-lg">
            Crear cuenta gratuita
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-cyan-100 mt-4 text-sm">
            Sin tarjeta de crédito • Configuración en 5 minutos • Soporte incluido
          </p>
        </div>
      </section>
  )
}
