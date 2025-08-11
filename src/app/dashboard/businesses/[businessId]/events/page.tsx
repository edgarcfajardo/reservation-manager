import { getBusinessEvents } from "@/server/database/events";
import { EventUI, mapEventToUI } from "@/models/event.model";
import EventDashboardClient from "@/components/events/EventDashboardClient";
import { getBusinessById } from "@/server/database/businesses";

interface DashboardEventsPageProps {
  params: Promise<{ businessId: string }>;
}

export default async function DashboardEventsPage({ params }: DashboardEventsPageProps) {
  const { businessId } = await params;

  // Validar el businessId
  if (!businessId) {
    return <div className="text-center mt-10 text-red-600">ID de negocio no proporcionado</div>;
  }

  const business = await getBusinessById(businessId);
  if (!business) {
    return <div className="text-center mt-10 text-red-600">Negocio no encontrado</div>;
  }

  const rawEvents = await getBusinessEvents(businessId);
  const events: EventUI[] = rawEvents.map(e => mapEventToUI(e));

  return (
    <EventDashboardClient
      events={events}
      businessId={businessId}
      businessSlug={business.slug}
    />
  );
}