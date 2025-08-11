import React from 'react'
import { Card, CardContent } from '../ui/card'
import { CircleUser, Star } from 'lucide-react'

export const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-gray-600">Miles de profesionales confían en Cita Manager</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                Cita Manager revolucionó mi clínica veterinaria. Ahora puedo gestionar todas las citas desde mi teléfono y mis clientes reciben recordatorios automáticos.
              </p>
              <div className="flex items-center space-x-3">
                <CircleUser className="h-12 w-12 rounded-full text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">Dr. María González</p>
                  <p className="text-sm text-gray-600">Veterinaria</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                Como tatuador, necesitaba algo simple pero potente. Cita Manager me permite organizar sesiones largas y mantener un portafolio de cada cliente.
              </p>
              <div className="flex items-center space-x-3">
                <CircleUser className="h-12 w-12 rounded-full text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">Carlos Ruiz</p>
                  <p className="text-sm text-gray-600">Tatuador</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                Los reportes en tiempo real me ayudan a tomar mejores decisiones para mi óptica. El ROI fue inmediato desde el primer mes.
              </p>
              <div className="flex items-center space-x-3">
                <CircleUser className="h-12 w-12 rounded-full text-gray-700" />
                <div>
                  <p className="font-semibold text-gray-900">Ana Martínez</p>
                  <p className="text-sm text-gray-600">Óptica Premium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
