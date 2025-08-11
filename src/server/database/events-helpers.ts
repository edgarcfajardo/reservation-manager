// Revisar y eliminar
import { createClient } from "@/utils/supabase/server";
import { Event } from "@/models/event.model";

// Busca un evento por slug
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) return null;
  return data as Event | null;
}
