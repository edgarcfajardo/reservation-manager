// src/types/appointment.ts
// Tipos centralizados para el sistema de citas

export interface Business {
  id: string
  slug: string
  name: string
  description?: string
}

export interface Event {
  id: string
  slug: string
  business_id: string  // mantengo snake_case para coincidir con BD
  name: string
  description?: string
  duration_minutes: number // en minutos
  price?: number
  availableSlots: TimeSlot[]
}

export interface TimeSlot {
  date: string // YYYY-MM-DD
  times: string[] // ["09:00", "10:00", "11:00"]
}

export interface User {
  id?: string
  email: string
  fullName?: string
  phone?: string
  isNew: boolean
  isRecurrent: boolean
}

export interface Appointment {
  id?: string
  userId: string
  eventId: string
  date: string // YYYY-MM-DD
  time: string // HH:mm (o HH:mm:ss si usas segundos)
  status: "pending" | "confirmed" | "cancelled"
  createdAt?: string
}

export interface AppointmentFlowState {
  currentStep: FlowStep
  user: Partial<User>
  selectedDate?: string
  selectedTime?: string
  existingAppointment?: Appointment
  event?: Event
  business?: Business
}

export type FlowStep =
  | "email"
  | "personal-data"
  | "data-validation"
  | "active-appointment"
  | "time-selection"
  | "confirmation"

export interface FormData {
  email: string
  fullName: string
  phone: string
  confirmPhone: boolean
}
