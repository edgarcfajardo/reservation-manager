// server/database/events.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { Event } from '@/models/event.model'

/* -----------------------------------------------------------
 * 1. Obtener todos los eventos del dueño autenticado
 * --------------------------------------------------------- */
export async function getUserEvents(): Promise<Event[]> {
  // Instanciamos Supabase con cookies del request
  const supabase = await createClient()

  // Obtenemos al usuario autenticado
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return []
  }

  // 1‑A. Traemos todos los negocios donde owner_id = user.id
  const { data: businesses, error: businessError } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)

  if (businessError || !businesses?.length) {
    return []
  }

  // 1‑B. Con esos IDs filtramos los eventos
  const businessIds = businesses.map(b => b.id)

  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .in('business_id', businessIds)

  if (eventsError) {
    return []
  }

  return events as Event[]
}

/* -----------------------------------------------------------
 * 2. Crear un nuevo evento
 *    (recibe un objeto con los campos mínimos)
 * --------------------------------------------------------- */
// Ahora acepta weeklyHours como segundo argumento
export async function createEvent(event: Omit<Event, 'id' | 'created_at'>, weeklyHours: Array<{ weekday: number; start_time: string; end_time: string; slot_interval: number }>) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Verificamos que el negocio pertenezca al usuario
  const { data: business } = await supabase
    .from('businesses')
    .select('id')
    .eq('id', event.business_id)
    .eq('owner_id', user.id)
    .single();

  if (!business) {
    throw new Error('Unauthorized - business does not belong to user');
  }

  // Insertamos el evento y obtenemos el id
  const { data: inserted, error } = await supabase.from('events').insert(event).select('id').single();
  if (error || !inserted) {
    throw new Error(`Error creating event: ${error?.message || error?.details || 'Unknown error'}`);
  }
  const eventId = inserted.id;

  // Insertamos los horarios semanales en event_weekly_hours
  if (weeklyHours.length > 0) {
    const weeklyRows = weeklyHours.map((wh) => ({ ...wh, event_id: eventId }));
    const { error: whError } = await supabase.from('event_weekly_hours').insert(weeklyRows);
    if (whError) {
      throw new Error(`Error creating weekly hours: ${whError.message || whError.details || 'Unknown error'}`);
    }
  }

  // Revalidamos la ruta del dashboard para que aparezca el nuevo evento
  revalidatePath('/dashboard/events');
  return { eventId };
}

/* -----------------------------------------------------------
 * 3. Eliminar evento (por id) – opcional
 * --------------------------------------------------------- */
export async function deleteEvent(eventId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Eliminamos sólo si el evento pertenece a un negocio del usuario
  const { error } = await supabase.rpc('delete_event_with_check', {
    _event_id: eventId,
    _owner_id: user.id,
  })
  /* Nota:
     - `delete_event_with_check` sería una función SQL o Policy que valide ownership,
       así evitamos lógica compleja en el servidor.
     - También puedes hacer un DELETE con un sub‑select similar al de getUserEvents().
  */

  if (error) {
    throw new Error('Error deleting event')
  }

  revalidatePath('/dashboard/events')
}




// Traer todos los eventos de un negocio
export async function getBusinessEvents(businessId: string) {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return []
  }

  const { data: businesses, error: businessError } = await supabase
    .from('businesses')
    .select('id')
    .eq('owner_id', user.id)

  if (businessError || !businesses?.length) {
    return []
  }

  const businessIds = businesses.map(b => b.id)

  if (!businessIds.includes(businessId)) {
    return []
  }

  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .eq('business_id', businessId)

  if (eventsError) {
    return []
  }

  return events || []
}
