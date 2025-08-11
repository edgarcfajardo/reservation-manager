// Revisar y eliminar
import { createClient } from "@/utils/supabase/server";
import { AppointmentModel } from "@/models/appointment.model";

// Busca una cita activa por email (status = 'active')
export async function getActiveAppointmentByEmail(email: string): Promise<AppointmentModel | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("client_email", email)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    return null;
  }

  return data as AppointmentModel | null;
}

// Verifica si un slot está disponible para un evento, fecha y hora
export async function isSlotAvailable(eventId: string, date: string, time: string): Promise<boolean> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("appointments")
    .select("id", { count: "exact", head: false })
    .eq("event_id", eventId)
    .eq("date", date)
    .eq("time", time)
    .eq("status", "active");

  if (error) {
    return false;
  }

  return (count ?? 0) === 0;
}
