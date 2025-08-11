"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertCircle } from "lucide-react"
import type { Appointment, User } from "@/types/appointment"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"

export interface ActiveAppointmentStepProps {
  user: Partial<User>;
  appointment: Appointment;
  /*
  onReschedule: () => void;
  onScheduleAnother: () => void;
  onCancel: () => void;
  */
}

/**
 * Componente para gestionar citas activas existentes
 * Permite reagendar, agendar otra cita o cancelar
 */
export function ActiveAppointmentStep({
  user,
  appointment,
  /*
  onReschedule,
  onScheduleAnother,
  onCancel,
  */
}: ActiveAppointmentStepProps) {
  const appointmentDate = new Date(`${appointment.date}T${appointment.time}`)
  const formattedDate = format(appointmentDate, "EEEE, d 'de' MMMM", { locale: es })
  const formattedTime = format(appointmentDate, "HH:mm")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: "Confirmada", variant: "default" as const },
      pending: { label: "Pendiente", variant: "secondary" as const },
      cancelled: { label: "Cancelada", variant: "destructive" as const },
    }

    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  const statusBadge = getStatusBadge(appointment.status)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Tienes una cita activa
        </CardTitle>
        <CardDescription>Hola {user.fullName}, encontramos una cita existente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Información de la cita actual */}
        <div className="p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Tu cita actual</h3>
            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="capitalize">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
              <Button className="mt-4">Volver al inicio</Button>
            </Link>
        </div>

        {/* Opciones disponibles */}
        {/*}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">¿Qué te gustaría hacer?</p>

          
          <div className="space-y-2">
            <Button onClick={onReschedule} variant="default" className="w-full">
              Reagendar esta cita
            </Button>

            <Button onClick={onScheduleAnother} variant="outline" className="w-full bg-transparent">
              Agendar otra cita
            </Button>

            <Button
              onClick={onCancel}
              variant="ghost"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Cancelar cita
            </Button>
          </div>
          
        </div>
        */}

        {/* Información adicional */}
        {/*
        <div className="text-xs text-muted-foreground text-center p-3 bg-blue-50 rounded-lg">
          <p>
            💡 <strong>Tip:</strong> Puedes reagendar hasta 24 horas antes de tu cita sin costo adicional
          </p>
        </div>
        */}
      </CardContent>
    </Card>
  )
}
