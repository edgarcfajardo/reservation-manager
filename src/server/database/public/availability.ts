"use server"

// server/database/public/appointments.ts (fragmento)
import { createClient } from "@/utils/supabase/server";
import { format, addMinutes, isBefore, isAfter } from "date-fns";

/**
 * Obtiene los días y horas disponibles para un evento específico
 */
export async function getAvailableSlotsForEvent(eventId: string) {
  const supabase = await createClient();

  // 1) obtener datos del evento
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, start_date, end_date, schedule, duration_minutes, min_hours_before")
    .eq("id", eventId)
    .single();
  if (eventError || !event) throw new Error("Evento no encontrado");

  // 2) obtener disponibilidad semanal
  const { data: weeklyHours, error: weeklyError } = await supabase
    .from("event_weekly_hours")
    .select("weekday, start_time, end_time, slot_interval")
    .eq("event_id", eventId);
  if (weeklyError) throw new Error("No se pudo obtener disponibilidad semanal");

  // 3) obtener citas ya agendadas (active/confirmed)
  const { data: appointments, error: appError } = await supabase
    .from("appointments")
    .select("date, time")
    .eq("event_id", eventId)
    .in("status", ["active", "confirmed"]);
  if (appError) throw new Error("No se pudo obtener citas agendadas");

  // 4) generar días válidos (usar T00:00:00 para evitar shift UTC)
  const startDate = new Date(`${event.start_date}T00:00:00`);
  const endDate = event.end_date ? new Date(`${event.end_date}T00:00:00`) : startDate;
  const days: string[] = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push(format(new Date(d), "yyyy-MM-dd"));
  }

  // 5) para cada día, calcular slots disponibles
  const availableSlots: { date: string; times: string[] }[] = [];
  for (const day of days) {
    const dateObj = new Date(`${day}T00:00:00`); // importante: forzar inicio del día local

    // weekday según JS: 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const weekday = dateObj.getDay();

    // buscar configuración semanal que coincida (tu tabla usa 0..6)
    const weekConfig = weeklyHours.find((w) => Number(w.weekday) === Number(weekday));
    if (!weekConfig) continue; // no hay disponibilidad ese día

    // parse start/end times (pueden venir como "09:00:00")
    const [startHour, startMinute] = String(weekConfig.start_time).slice(0,5).split(":").map(Number);
    const [endHour, endMinute] = String(weekConfig.end_time).slice(0,5).split(":").map(Number);
    const slotInterval = Number(weekConfig.slot_interval) || 15;

    let slotTime = new Date(dateObj);
    slotTime.setHours(startHour, startMinute, 0, 0);

    const dayEndTime = new Date(dateObj);
    dayEndTime.setHours(endHour, endMinute, 0, 0);

    const slots: string[] = [];

    while (isBefore(slotTime, dayEndTime)) {
      // fin del slot según duración del evento
      const slotEndDate = addMinutes(slotTime, Number(event.duration_minutes || 0));

      // si el slot termina después del horario final, no considerar
      if (isAfter(slotEndDate, dayEndTime)) break;

      // regla: min_hours_before
      const now = new Date();
      const minHoursBefore = Number(event.min_hours_before || 0);
      const minAllowed = new Date(now.getTime() + minHoursBefore * 60 * 60 * 1000);
      if (slotTime < minAllowed) {
        slotTime = addMinutes(slotTime, slotInterval);
        continue;
      }

      const slotStr = format(slotTime, "HH:mm");

      // verificar solapamiento con citas existentes (considerando duración del evento)
      const overlaps = (appointments || []).some((a: { date: string; time: string }) => {
        if (!a || a.date !== day) return false;
        const timeOnly = (a.time || "").slice(0,5);
        const existingStart = new Date(dateObj);
        const [h, m] = timeOnly.split(":").map(Number);
        existingStart.setHours(h, m, 0, 0);
        const existingEnd = addMinutes(existingStart, Number(event.duration_minutes || 0));
        // hay overlap si slotTime < existingEnd && slotEndDate > existingStart
        return slotTime < existingEnd && slotEndDate > existingStart;
      });

      if (!overlaps) slots.push(slotStr);

      slotTime = addMinutes(slotTime, slotInterval);
    }

    if (slots.length > 0) {
      availableSlots.push({ date: day, times: slots });
    }
  }

  return availableSlots;
}
