// models/event.model.ts

export type Event = {
  id: string;
  business_id: string;
  slug: string;
  name: string;
  description: string | null;
  location_type: "in_person" | "phone_call" | "video";
  location_detail: string | null;
  duration_minutes: number;
  start_date: string; // YYYY-MM-DD
  end_date: string | null; // YYYY-MM-DD o null
  max_days_ahead: number | null;
  min_hours_before: number | null;
  created_at: string; // timestamp string
  schedule: unknown; // jsonb, puedes definir un tipo más específico si quieres
};

/** =========
 *  Adaptador simple de Event → EventUI
 *  (lo usamos en la page server para pasar datos limpios al cliente)
 * ========= */
export type EventUI = {
  id: string;
  title: string;
  duration: number;
  durationType: "minutes" | "hours";
  locationType: "in-person" | "phone" | "video";
  locationDetail: string | null;
  scheduleDescription: string;
  link: string;
  createdAt: Date;
  maxDaysAhead: number | null;
  minHoursBefore: number | null;
};

export function mapEventToUI(e: Event): EventUI {
  return {
    id: e.id,
    title: e.name,
    duration: e.duration_minutes >= 60 ? e.duration_minutes / 60 : e.duration_minutes,
    durationType: e.duration_minutes >= 60 ? "hours" : "minutes",
    locationType:
      e.location_type === "in_person"
        ? "in-person"
        : e.location_type === "phone_call"
        ? "phone"
        : "video",
    locationDetail: e.location_detail,
    scheduleDescription: "Rango definido en el evento", // Puedes mejorar usando e.schedule y event_weekly_hours
    link: e.slug, // Solo el slug, no la URL completa
    createdAt: new Date(e.created_at),
    maxDaysAhead: e.max_days_ahead,
    minHoursBefore: e.min_hours_before,
  };
}
