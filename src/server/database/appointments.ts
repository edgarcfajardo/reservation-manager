"use server";

import { AppointmentCreateModel } from "@/models/appointment.model";
import { createClient } from "@/utils/supabase/server";

export const createNewAppointment = async (
  appointment: AppointmentCreateModel & { businessId?: string }
) => {
  const supabase = await createClient();

  // Validar que exista el ID del evento
  if (!appointment.eventId) {
    return { error: "Falta el eventId para la cita." };
  }

  // Validaciones básicas formato fecha/hora
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!dateRegex.test(appointment.date) || !timeRegex.test(appointment.time)) {
    return { error: "Formato de fecha u hora inválido." };
  }

  // Si se recibe businessId, verificar que el evento pertenezca a ese negocio.
  if (appointment.businessId) {
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("id, business_id")
      .eq("id", appointment.eventId)
      .single();

    if (eventError || !eventData) {
      return { error: "Evento no encontrado." };
    }

    if (String(eventData.business_id) !== String(appointment.businessId)) {
      return { error: "El evento no pertenece al negocio indicado." };
    }
  } else {
    // Si no se proporciona businessId, podemos verificar que el evento exista
    const { data: existEvent, error: existErr } = await supabase
      .from("events")
      .select("id")
      .eq("id", appointment.eventId)
      .single();

    if (existErr || !existEvent) {
      return { error: "Evento no encontrado." };
    }
  }

  // Chequeo de disponibilidad / duplicado: mismo event_id, misma fecha y hora con estado activo/confirmed
  const { data: existing, error: existError } = await supabase
    .from("appointments")
    .select("id")
    .eq("event_id", appointment.eventId)
    .eq("date", appointment.date)
    .eq("time", appointment.time)
    .in("status", ["active", "confirmed"]);

  if (existError) {
    return { error: "Error al verificar disponibilidad." };
  }

  if (existing && existing.length > 0) {
    return { error: "El horario seleccionado ya está ocupado. Elige otro." };
  }

  // Mapear los campos para insertar (sin business_id, porque la tabla no lo tiene)
  const dbAppointment: Record<string, unknown> = {
    event_id: appointment.eventId,
    client_full_name: appointment.fullName,
    client_email: appointment.email,
    client_phone: appointment.phone,
    date: appointment.date,
    time: appointment.time,
    status: "active",
  };

  const { data, error } = await supabase
    .from("appointments")
    .insert(dbAppointment)
    .select()
    .single();

  if (error) {
    const message = typeof error === "string" ? error : error.message || JSON.stringify(error);
    return { error: message };
  }

  return { data };
};



// Busca todas las citas de un negocio
export const getAllAppointments = async (businessId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("appointments")
    .select(`
      *,
      events!appointments_event_id_fkey (
        id,
        name,
        business_id
      )
    `)
    .order("date", { ascending: true });

  if (error) {
    return [];
  }

  // Filtrar solo los eventos que pertenecen al businessId
  const filteredAppointments = data.filter(
    (appointment: { events?: { business_id?: string } }) => appointment.events?.business_id === businessId
  );

  return filteredAppointments;
};

