import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import HeroImage from "@/assets/images/heroImage.jpg"

export const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Agenda tus citas en{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                    minutos
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  La plataforma todo-en-uno para veterinarios, ópticas, tatuadores, dentistas y más. Gestiona citas,
                  clientes y pagos desde un solo lugar.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3">
                  Probar gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 bg-transparent"
                >
                  Ver planes
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Sin tarjeta de crédito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Configuración en 5 minutos</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gradient-to-br from-cyan-50 to-purple-50 rounded-2xl p-8">
                <div className="relative w-full h-[400px]">   {/* 1️⃣ dimensiones aquí */}
                  <Image
                    src={HeroImage}
                    alt="Dashboard de Cita Manager"
                    width={500}
                    height={500}                                // 2️⃣ ocupa todo el div
                    sizes="(min-width: 768px) 500px, 100vw h-auto"
                    priority
                    className="rounded-lg shadow-2xl object-cover object-center"
                  />
                </div>


                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium">+127 citas hoy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
