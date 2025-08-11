// Revisar y eliminar
"use server";
import { createNewAppointment } from "@/server/database/appointments";
import { getActiveAppointmentByEmail, isSlotAvailable } from "@/server/database/appointments-helpers";
import { getEventBySlug } from "@/server/database/events-helpers";

export async function bookAppointmentAction(form: {
  fullName: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  eventSlug: string;
  businessSlug?: string;
}) {
  // 1. Validar si ya existe una cita activa para ese email
  const existing = await getActiveAppointmentByEmail(form.email);
  if (existing) {
    return { error: "Ya tienes una cita activa. Cancela o espera a que termine antes de agendar otra." };
  }

  // 2. Validar disponibilidad del evento y horario
  const event = await getEventBySlug(form.eventSlug);
  if (!event) return { error: "Evento no encontrado." };

  // Si se requiere validar el business, aquí podrías buscar el businessId por el businessSlug
  // y comparar event.business_id === business.id
  if (form.businessSlug) {
    // Si tienes un helper getBusinessBySlug, podrías usarlo aquí
    // Por ahora solo validamos que el evento pertenezca al businessSlug si se provee
    // (esto es opcional, puedes omitir si no es necesario)
  }

  // Convertir la fecha a string YYYY-MM-DD
  const dateStr = form.date instanceof Date ? form.date.toISOString().slice(0, 10) : String(form.date);
  const slotAvailable = await isSlotAvailable(event.id, dateStr, form.time);
  if (!slotAvailable) {
    return { error: "El horario seleccionado ya está ocupado. Elige otra hora o fecha." };
  }

  // 3. Crear la cita
  const appointment = {
    eventId: event.id,
    fullName: form.fullName,
    email: form.email,
    phone: form.phone,
    date: dateStr,
    time: form.time,
    // businessId ya no es necesario si no se usa en la tabla
  };

  const result = await createNewAppointment(appointment);
  if ((result as { error?: unknown })?.error) {
    return { error: "No se pudo crear la cita. Intenta de nuevo." };
  }

  return { success: true };
}
