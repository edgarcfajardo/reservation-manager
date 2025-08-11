"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, Clock, User, Mail, Phone, ExternalLink } from "lucide-react"
import type { AppointmentFlowState } from "@/types/appointment"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface ConfirmationStepProps {
  state: AppointmentFlowState
  onAddToCalendar: () => void
  isLoading: boolean
}

/**
 * Componente de confirmación final de la cita
 * Muestra resumen completo y opción para agregar al calendario
 */
export function ConfirmationStep({ state, onAddToCalendar, isLoading }: ConfirmationStepProps) {
  const { user, selectedDate, selectedTime, event } = state

  if (!selectedDate || !selectedTime || !event) {
    return null
  }

  const appointmentDate = new Date(`${selectedDate}T${selectedTime}`)
  const formattedDate = format(appointmentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
  const formattedTime = format(appointmentDate, "HH:mm")

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Mensaje de confirmación */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">¡Cita confirmada!</CardTitle>
          <CardDescription className="text-green-700">Tu reserva ha sido procesada exitosamente</CardDescription>
        </CardHeader>
      </Card>

      {/* Detalles de la cita */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Detalles de tu cita
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Información del evento */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{event.name}</h3>
              <Badge variant="secondary">{event.duration_minutes} min</Badge>
            </div>
            {event.description && <p className="text-sm text-muted-foreground mb-3">{event.description}</p>}
            {event.price && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Precio:</span>
                <Badge variant="outline">${event.price}</Badge>
              </div>
            )}
          </div>

          {/* Fecha y hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-medium capitalize">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Hora</p>
                <p className="font-medium">{formattedTime}</p>
              </div>
            </div>
          </div>

          {/* Información del usuario */}
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Información de contacto
            </h4>
            <div className="grid gap-2 pl-6">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.email}</span>
              </div>
              {user.fullName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.fullName}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Button onClick={onAddToCalendar} className="w-full" size="lg" disabled={isLoading}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Agregar a Google Calendar
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Te hemos enviado un email de confirmación con todos los detalles
              </p>
              <p className="text-xs text-muted-foreground">
                Si necesitas hacer cambios, puedes reagendar hasta 24 horas antes de tu cita
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h4 className="font-medium text-blue-800">¿Qué sigue?</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Recibirás un recordatorio 24 horas antes de tu cita</p>
              <p>• Puedes reagendar o cancelar desde el enlace en tu email</p>
              <p>• Si tienes preguntas, contáctanos directamente</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
