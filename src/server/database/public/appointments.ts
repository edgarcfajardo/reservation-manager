"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


/**
 * Crea una cita pública con validación básica de disponibilidad
 */
export async function createPublicAppointment(payload: {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  date: string; // formato YYYY-MM-DD
  time: string; // formato HH:mm:ss
}) {
  const supabase = await createClient();

  // Validar que el evento existe
  const { data: eventExists } = await supabase
    .from("events")
    .select("id")
    .eq("id", payload.eventId)
    .single();

  if (!eventExists) {
    throw new Error("Evento no válido");
  }

  // Validar que no haya cita previa en la misma fecha y hora para ese evento
  const { data: existingAppointment } = await supabase
    .from("appointments")
    .select("id")
    .eq("event_id", payload.eventId)
    .eq("date", payload.date)
    .eq("time", payload.time)
    .maybeSingle();

  if (existingAppointment) {
    throw new Error("Este horario ya está ocupado");
  }

  // Insertar la cita
  const { data: inserted, error } = await supabase
    .from("appointments")
    .insert({
      event_id: payload.eventId,
      client_full_name: payload.fullName,
      client_email: payload.email,
      client_phone: payload.phone,
      date: payload.date,
      time: payload.time,
      status: "active",
    })
    .select("id")
    .single();

  if (error || !inserted) {
    throw new Error("No se pudo crear la cita");
  }

  // Invalidar caché de la ruta principal (ajustar si tienes rutas estáticas afectadas)
  revalidatePath(`/`);

  return { success: true, appointmentId: inserted.id };
}



/* -------------------------------------------- */


export async function getBusinessAndEventIds(
  businessSlug: string,
  eventSlug: string
): Promise<
  { businessId: string; eventId: string } | null
> {
  const supabase = await createClient();

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("slug", businessSlug)
    .single();

  if (businessError || !business) {
    return null; 
  }

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, business_id")
    .eq("slug", eventSlug)
    .eq("business_id", business.id)
    .single();

  if (eventError || !event) {
    return null;
  }

  return {
    businessId: business.id,
    eventId: event.id,
  };
}



/**
 * Obtiene la información completa de un negocio por su ID
 */
export async function getBusinessById(businessId: string) {
  const supabase = await createClient();

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", businessId)
    .single();

  if (error || !business) {
    throw new Error("Negocio no encontrado");
  }

  return business;
}

/**
 * Obtiene la información completa de un evento por su ID
 */
export async function getEventById(eventId: string) {
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error || !event) {
    throw new Error("Evento no encontrado");
  }

  return event;
}








export async function getExistingAppointment(email: string, eventId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("event_id", eventId)
    .eq("client_email", email)
    .maybeSingle(); 

  if (error) throw error;
  return data;
}
