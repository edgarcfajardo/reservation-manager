"use client";

import { useEffect, useState } from "react";
import { useAppointmentFlow } from "@/hooks/appointments/useAppointmentFlow";
import { EmailStep } from "@/components/appointments-public/EmailStep";
import { PersonalDataStep } from "@/components/appointments-public/PersonalDataStep";
import { DataValidationStep } from "@/components/appointments-public/DataValidationStep";
import { ActiveAppointmentStep } from "@/components/appointments-public/ActiveAppointmentStep";
import { TimeSelectionStep } from "@/components/appointments-public/TimeSelectionStep";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Business, Event } from "@/types/appointment";
import { getBusinessById, getEventById, getExistingAppointment } from "@/server/database/public/appointments";
import { getAvailableSlotsForEvent } from "@/server/database/public/availability";

interface Props {
  businessId: string;
  eventId: string;
  businessSlug: string;
  eventSlug: string;
  createAppointmentAction: (formData: FormData) => Promise<void>;
}

export default function AppointmentBooking({
  businessId,
  eventId,
  businessSlug,
  eventSlug,
  createAppointmentAction,
}: Props) {

  const [business, setBusiness] = useState<Business | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Hook para manejar el flujo de la cita
  const {
    state,
    isLoading,
    processEmail,
    savePersonalData,
    validateUserData,
    selectDateTime,
    goToNextStep,
    // TODO: Refactorizar y migrar la lógica de flujo aquí si se elimina el hook
    // Las funciones y el estado pueden moverse a este componente si se decide eliminar el hook
    // Las funcionalidades comentadas abajo se pueden restaurar y mejorar en el futuro
  } = useAppointmentFlow();

  // Cargar datos iniciales del negocio y evento
  useEffect(() => {
    async function fetchData() {
      setIsInitializing(true);
      setLoadError(null);
      try {
        const businessData = await getBusinessById(businessId);
        const eventData = await getEventById(eventId);

        setBusiness(businessData);

        // Obtener slots reales desde el backend
        const availableSlots = await getAvailableSlotsForEvent(eventData.id);
        const eventForFlow: Event = {
          id: eventData.id,
          slug: eventData.slug,
          business_id: eventData.business_id,
          name: eventData.name,
          description: eventData.description,
          duration_minutes: eventData.duration_minutes,
          availableSlots,
        };
        setEvent(eventForFlow);

        // Comenzar en el paso email
        goToNextStep("email", { business: businessData, event: eventForFlow });
      } catch (error) {
        // Manejo seguro del error para cualquier tipo
        let errorMsg = "Error al cargar datos";
        if (typeof error === "object" && error && "message" in error && typeof (error as { message?: string }).message === "string") {
          errorMsg = (error as { message?: string }).message || errorMsg;
        } else if (typeof error === "string") {
          errorMsg = error;
        }
        setLoadError(errorMsg);
      } finally {
        setIsInitializing(false);
      }
    }
    fetchData();
  }, [businessId, eventId, goToNextStep]);

  // Verificación de cita existente
  async function handleProcessEmail(email: string) {
    if (!event) return;
    setLoadError(null);
    try {
      const existingAppointment = await getExistingAppointment(email, event.id);
      if (existingAppointment && existingAppointment.status !== "cancelled") {
        goToNextStep("active-appointment", {
          user: { email },
          existingAppointment,
          event,
        });
      } else {
        processEmail(email);
      }
    } catch {
      setLoadError("No se pudo verificar la cita. Intenta de nuevo más tarde.");
      processEmail(email);
    } 
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="text-muted-foreground">Cargando información...</p>
        </div>
      </div>
    );
  }

  if (loadError || !business || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4 max-w-md">
          <div className="flex flex-col items-center">
            <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
            <h1 className="text-2xl font-bold text-gray-900">Ocurrió un error</h1>
          </div>
          <p className="text-gray-600">
            {loadError ?? "El negocio o servicio que buscas no existe o no está disponible."}
          </p>
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        {/* Botón atrás */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{business?.name}</h1>
          {business?.description && (
            <p className="text-gray-600 mb-4">{business.description}</p>
          )}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
            📅 {event?.name} • {event?.duration_minutes} min
          </div>
        </div>

        {/* Flujo */}
        {state.currentStep === "email" && (
          <EmailStep onSubmit={handleProcessEmail} isLoading={isLoading} />
        )}

        {state.currentStep === "personal-data" && (
          <PersonalDataStep onSubmit={savePersonalData} userEmail={state.user.email || ""} />
        )}

        {state.currentStep === "data-validation" && (
          <DataValidationStep user={state.user} onSubmit={validateUserData} />
        )}

        {state.currentStep === "active-appointment" && state.existingAppointment && (
          <ActiveAppointmentStep
            user={state.user}
            appointment={state.existingAppointment}
            // TODO: Implementar funcionalidad de reagendar, agendar otra y cancelar cita
            // onReschedule={() => goToNextStep("time-selection")}
            // onScheduleAnother={() => goToNextStep("time-selection")}
            // onCancel={() => alert("Funcionalidad de cancelación no implementada en el demo")}
          />
        )}

        {state.currentStep === "time-selection" && state.event && (
          <TimeSelectionStep event={state.event} onSelectDateTime={selectDateTime} />
        )}

        {state.currentStep === "confirmation" && (
          <>
            {/* Resumen */}
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow mb-4">
              <h2 className="text-xl font-semibold mb-4">Resumen</h2>
              <p><strong>Servicio:</strong> {state.event?.name}</p>
              <p><strong>Fecha:</strong> {state.selectedDate}</p>
              <p><strong>Hora:</strong> {state.selectedTime}</p>
              <p><strong>Nombre:</strong> {state.user.fullName}</p>
              <p><strong>Email:</strong> {state.user.email}</p>
              <p><strong>Teléfono:</strong> {state.user.phone}</p>
            </div>

            {/* Formulario */}
            <form
              action={createAppointmentAction}
              className="max-w-md mx-auto"
            >
              <input type="hidden" name="businessId" value={business?.id || ""} />
              <input type="hidden" name="eventId" value={event?.id || ""} />
              <input type="hidden" name="businessSlug" value={businessSlug || ""} />
              <input type="hidden" name="eventSlug" value={eventSlug || ""} />
              <input type="hidden" name="fullName" value={state.user.fullName || ""} />
              <input type="hidden" name="email" value={state.user.email || ""} />
              <input type="hidden" name="phone" value={state.user.phone || ""} />
              <input type="hidden" name="date" value={state.selectedDate || ""} />
              <input type="hidden" name="time" value={state.selectedTime || ""} />

              <div className="space-y-2">
                <Button type="submit" className="w-full">Confirmar cita</Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => goToNextStep("time-selection")}
                  type="button"
                >
                  Regresar a horarios
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
