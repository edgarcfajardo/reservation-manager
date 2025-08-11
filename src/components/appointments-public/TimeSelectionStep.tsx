"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, MapPin, DollarSign, CalendarIcon, CheckCircle2, AlertCircle } from "lucide-react"
import type { Event, TimeSlot } from "@/types/appointment"
import { format, isSameDay } from "date-fns"
import { es } from "date-fns/locale"

interface TimeSelectionStepProps {
  event: Event
  onSelectDateTime: (date: string, time: string) => void
}

export function TimeSelectionStep({ event, onSelectDateTime }: TimeSelectionStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const availableSlots: TimeSlot[] = event.availableSlots || []

  // Limitar fechas según max_days_ahead
  const maxDaysAhead = event.max_days_ahead ?? 30
  const today = new Date()
  const startDate = event.start_date
    ? new Date(`${event.start_date}T00:00:00`)
    : today

  // Si la fecha de inicio es anterior a hoy, usamos hoy
  const effectiveStartDate = startDate < today ? today : startDate

  const lastAllowedDate = new Date(effectiveStartDate)
  lastAllowedDate.setDate(lastAllowedDate.getDate() + maxDaysAhead)

  // Filtrar solo fechas válidas
  const availableDates = availableSlots
    .map((s) => {
      const d = new Date(`${s.date}T00:00:00`)
      return d >= effectiveStartDate && d <= lastAllowedDate ? d : null
    })
    .filter((d): d is Date => d !== null)

  const noAvailableDates = availableDates.length === 0

  const getAvailableTimesForDate = (date?: Date) => {
    if (!date) return []
    const dateString = format(date, "yyyy-MM-dd")
    return availableSlots.find((s) => s.date === dateString)?.times ?? []
  }

  const availableTimesForSelectedDate = selectedDate
    ? getAvailableTimesForDate(selectedDate)
    : []

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return
    onSelectDateTime(format(selectedDate, "yyyy-MM-dd"), selectedTime)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-12 gap-8">
        {/* Columna izquierda */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow h-full">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-full">
                <CalendarIcon className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">Información</h3>
            <h4 className="font-bold text-gray-900 mb-2">{event.name}</h4>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{event.duration_minutes} minutos</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="font-medium">Presencial</span>
              </div>
              {event.price && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-emerald-600">${event.price}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="gap-0 p-0 h-full flex flex-col">
            <CardContent className="relative p-0 md:pr-48 flex-grow">
              <div className="p-6 flex justify-center">
                {noAvailableDates ? (
                  <div className="flex flex-col items-center justify-center w-full py-12">
                    <AlertCircle className="h-8 w-8 text-red-400 mb-2" />
                    <span className="text-red-500 font-semibold text-center">
                      No hay horarios disponibles para agendar en este evento.
                      <br />Intenta con otra fecha o evento.
                    </span>
                  </div>
                ) : (
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => {
                      setSelectedDate(d)
                      setSelectedTime(null)
                    }}
                    defaultMonth={selectedDate ?? effectiveStartDate}
                    showOutsideDays={false}
                    disabled={(date) => {
                      const outOfRange = date < effectiveStartDate || date > lastAllowedDate
                      const notInAvailable = !availableDates.some((d) => isSameDay(d, date))
                      return outOfRange || notInAvailable
                    }}
                    className="bg-transparent p-0 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
                    formatters={{
                      formatWeekdayName: (date) =>
                        date.toLocaleString("es-ES", { weekday: "short" }),
                    }}
                    locale={es}
                  />
                )}
              </div>

              <div className="no-scrollbar inset-y-0 right-0 flex max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
                <div className="grid gap-2">
                  {selectedDate && availableTimesForSelectedDate.length > 0 ? (
                    availableTimesForSelectedDate.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="w-full shadow-none"
                      >
                        {time}
                      </Button>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Selecciona una fecha con horarios disponibles.
                    </span>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
              <div className="text-sm">
                {selectedDate && selectedTime ? (
                  <>
                    Tu cita está programada para{" "}
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>{" "}
                    a las <span className="font-medium">{selectedTime}</span>.
                  </>
                ) : (
                  <>Selecciona una fecha y hora para tu cita.</>
                )}
              </div>

              <Button
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime}
                size="lg"
                className="ml-auto"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Confirmar cita
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
