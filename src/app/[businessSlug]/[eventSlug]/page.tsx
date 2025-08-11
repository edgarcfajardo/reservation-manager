import AppointmentBooking from "@/components/event-public/AppointmentBooking";
import { getBusinessAndEventIds } from "@/server/database/public/appointments";
import { createAppointmentAction } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ businessSlug: string; eventSlug: string }>;
}

export default async function AppointmentBookingPage({ params }: PageProps) {
  const { businessSlug, eventSlug } = await params;

  // Obtener IDs de negocio y evento
  const ids = await getBusinessAndEventIds(businessSlug, eventSlug);

  if (!ids) {
    // Si no se encontró negocio o evento, mostramos mensaje con estilo
    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900">Evento no encontrado</h1>
          <div className="text-gray-600">
            <p>
              {"El evento que intentas acceder no existe o ya no está disponible."}
            </p>
            <p>
              {"Verifica que el enlace sea correcto o que el evento siga activo."}
            </p>
          </div>

          <Link href="/">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AppointmentBooking
      businessSlug={businessSlug}
      eventSlug={eventSlug}
      businessId={ids.businessId}
      eventId={ids.eventId}
      createAppointmentAction={createAppointmentAction}
    />
  );
}
