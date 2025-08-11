
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

export const FAQ = () => {
  return (
    <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
            <p className="text-xl text-gray-600">Resolvemos tus dudas más comunes</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">¿Cómo empiezo a usar Cita Manager?</AccordionTrigger>
              <AccordionContent>
                Es muy simple. Solo regístrate con tu email, configura tu perfil de negocio y comienza a agendar citas
                inmediatamente. El proceso toma menos de 5 minutos y no necesitas tarjeta de crédito para empezar.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                ¿Puedo cancelar mi suscripción en cualquier momento?
              </AccordionTrigger>
              <AccordionContent>
                Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay contratos ni
                penalizaciones. Si cancelas, mantienes acceso hasta el final de tu período de facturación actual.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">¿Mis datos están seguros?</AccordionTrigger>
              <AccordionContent>
                Absolutamente. Utilizamos encriptación de grado bancario y cumplimos con todas las regulaciones de
                protección de datos. Tus datos y los de tus clientes están completamente seguros y nunca los compartimos
                con terceros.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">¿Puedo usar Cita Manager en mi teléfono?</AccordionTrigger>
              <AccordionContent>
                Sí, Cita Manager está optimizado para funcionar perfectamente en cualquier dispositivo. Puedes gestionar
                tu negocio desde tu computadora, tablet o teléfono con la misma funcionalidad completa.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">¿Ofrecen soporte técnico?</AccordionTrigger>
              <AccordionContent>
                Por supuesto. Ofrecemos soporte por email para todos los planes, chat en vivo para planes Profesional y
                Enterprise, y soporte telefónico prioritario para clientes Enterprise. También tenemos una base de
                conocimientos completa.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
  )
}
