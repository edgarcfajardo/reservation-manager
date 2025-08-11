import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Check, X } from 'lucide-react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export const Plans = () => {
  return (
    <section id="precios" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planes que se adaptan a tu negocio</h2>
            <p className="text-xl text-gray-600">Comienza gratis y escala según tus necesidades</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Gratis */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Gratis</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-600">/mes</span>
                </div>
                <CardDescription className="mt-2">Perfecto para empezar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Hasta 50 citas/mes</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>1 usuario</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Recordatorios básicos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">Reportes avanzados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <X className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">Integraciones</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-transparent" variant="outline">
                  Comenzar gratis
                </Button>
              </CardContent>
            </Card>

            {/* Plan Profesional */}
            <Card className="border-2 border-cyan-500 relative shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1">Más popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Profesional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$489</span>
                  <span className="text-gray-600">/mes</span>
                </div>
                <CardDescription className="mt-2">Para negocios en crecimiento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Citas ilimitadas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Hasta 5 usuarios</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Recordatorios avanzados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Reportes completos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Integraciones básicas</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                  Empezar prueba gratuita
                </Button>
              </CardContent>
            </Card>

            {/* Plan Enterprise */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$899</span>
                  <span className="text-gray-600">/mes</span>
                </div>
                <CardDescription className="mt-2">Para equipos grandes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Todo ilimitado</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Usuarios ilimitados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>API completa</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Integraciones premium</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-transparent" variant="outline">
                  Contactar ventas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}
