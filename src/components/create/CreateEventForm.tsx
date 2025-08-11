// Componente para crear un nuevo evento en el dashboard
"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { EventDetailsSection } from "./sections/EventDetailsSection"
import { AvailabilitySection } from "./sections/AvailabilitySection"
import { EventUrlSection } from "./sections/EventUrlSection"

// Utilidad para obtener el BASE_URL público
const getBaseUrl = () => {
  // Preferir variable de entorno, fallback a localhost
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}
import { createEvent } from "@/server/database/events"

// Helper: convierte los datos del formulario al formato esperado por createEvent y event_weekly_hours
function convertFormToEvent(data: CreateEventFormData) {
  const validLocationTypes = ["in_person", "phone_call", "video"];
  const location_type = validLocationTypes.includes(data.location_type)
    ? data.location_type as "in_person" | "phone_call" | "video"
    : "in_person";

  // Prepara el objeto para la tabla events
  const event = {
    name: data.name,
    description: data.description ?? null,
    duration_minutes: Number(data.duration_minutes),
    location_type,
    location_detail: null, // Puedes ajustar si tienes este campo en el formulario
    start_date: data.start_date,
    end_date: data.end_date,
    max_days_ahead: Number(data.max_days_ahead),
    min_hours_before: Number(data.min_hours_before),
    slug: data.slug,
    business_id: data.business_id,
    schedule: {
      monday: data.monday_enabled ? { start: data.monday_start, end: data.monday_end } : null,
      tuesday: data.tuesday_enabled ? { start: data.tuesday_start, end: data.tuesday_end } : null,
      wednesday: data.wednesday_enabled ? { start: data.wednesday_start, end: data.wednesday_end } : null,
      thursday: data.thursday_enabled ? { start: data.thursday_start, end: data.thursday_end } : null,
      friday: data.friday_enabled ? { start: data.friday_start, end: data.friday_end } : null,
      saturday: data.saturday_enabled ? { start: data.saturday_start, end: data.saturday_end } : null,
      sunday: data.sunday_enabled ? { start: data.sunday_start, end: data.sunday_end } : null,
    },
  };

  // Prepara los datos para event_weekly_hours
  // Puedes ajustar slot_interval aquí si lo agregas al formulario
  const weeklyHours: Array<{ weekday: number; start_time: string; end_time: string; slot_interval: number }> = [];
  const slotInterval = 15; // Puedes cambiar esto o tomarlo del formulario
  const days = [
    { key: "monday", weekday: 1 },
    { key: "tuesday", weekday: 2 },
    { key: "wednesday", weekday: 3 },
    { key: "thursday", weekday: 4 },
    { key: "friday", weekday: 5 },
    { key: "saturday", weekday: 6 },
    { key: "sunday", weekday: 0 },
  ];
  days.forEach((d) => {
    const enabled = Boolean((data as Record<string, unknown>)[`${d.key}_enabled`]);
    const start = String((data as Record<string, unknown>)[`${d.key}_start`] ?? "09:00");
    const end = String((data as Record<string, unknown>)[`${d.key}_end`] ?? "17:00");
    if (enabled) {
      weeklyHours.push({
        weekday: d.weekday,
        start_time: start,
        end_time: end,
        slot_interval: slotInterval,
      });
    }
  });

  return { event, weeklyHours };
}

// Esquema de validación del formulario usando zod
const formSchema = z.object({
  name: z.string().min(1, "El nombre del evento es requerido"),
  description: z.string().optional(),
  duration_minutes: z.string().min(1, "La duración es requerida"),
  location_type: z.string().min(1, "El tipo de ubicación es requerido"),
  start_date: z.string().min(1, "La fecha de inicio es requerida"),
  end_date: z.string().min(1, "La fecha de fin es requerida"),
  max_days_ahead: z.string().min(1, "Los días máximos son requeridos"),
  min_hours_before: z.string().min(1, "Las horas mínimas son requeridas"),
  slug: z.string().min(1, "El slug es requerido"),
  business_id: z.string().min(1, "El negocio es requerido"), // Campo hidden
  monday_enabled: z.boolean(),
  monday_start: z.string(),
  monday_end: z.string(),
  tuesday_enabled: z.boolean(),
  tuesday_start: z.string(),
  tuesday_end: z.string(),
  wednesday_enabled: z.boolean(),
  wednesday_start: z.string(),
  wednesday_end: z.string(),
  thursday_enabled: z.boolean(),
  thursday_start: z.string(),
  thursday_end: z.string(),
  friday_enabled: z.boolean(),
  friday_start: z.string(),
  friday_end: z.string(),
  saturday_enabled: z.boolean(),
  saturday_start: z.string(),
  saturday_end: z.string(),
  sunday_enabled: z.boolean(),
  sunday_start: z.string(),
  sunday_end: z.string(),
})

export type CreateEventFormData = z.infer<typeof formSchema>


interface CreateEventFormProps {
  businessId: string; // ID del negocio, necesario para la server action
  businessSlug: string; // Slug del negocio, necesario para la URL del evento
}


// Componente principal para crear un evento
export function CreateEventForm({ businessId, businessSlug }: CreateEventFormProps) {
  // Estado de transición para mostrar loading
  const [isPending, startTransition] = useTransition();
  // Hook de navegación
  const router = useRouter();

  // Inicializa React Hook Form con zod y valores por defecto
  const form = useForm<CreateEventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      duration_minutes: "",
      location_type: "",
      start_date: "",
      end_date: "",
      max_days_ahead: "",
      min_hours_before: "",
      slug: "",
      business_id: businessId,
      monday_enabled: false,
      monday_start: "09:00",
      monday_end: "17:00",
      tuesday_enabled: false,
      tuesday_start: "09:00",
      tuesday_end: "17:00",
      wednesday_enabled: false,
      wednesday_start: "09:00",
      wednesday_end: "17:00",
      thursday_enabled: false,
      thursday_start: "09:00",
      thursday_end: "17:00",
      friday_enabled: false,
      friday_start: "09:00",
      friday_end: "17:00",
      saturday_enabled: false,
      saturday_start: "09:00",
      saturday_end: "17:00",
      sunday_enabled: false,
      sunday_start: "09:00",
      sunday_end: "17:00",
    },
  });

  // Handler para el submit del formulario
  const onSubmit = (data: CreateEventFormData) => {
    // Validación extra: fechas y horas
    if (isNaN(Date.parse(data.start_date)) || isNaN(Date.parse(data.end_date))) {
      toast.error("Las fechas no son válidas");
      return;
    }
    if (isNaN(Number(data.duration_minutes)) || Number(data.duration_minutes) <= 0) {
      toast.error("La duración debe ser un número positivo");
      return;
    }
    if (isNaN(Number(data.max_days_ahead)) || Number(data.max_days_ahead) <= 0) {
      toast.error("Los días máximos deben ser un número positivo");
      return;
    }
    if (isNaN(Number(data.min_hours_before)) || Number(data.min_hours_before) < 0) {
      toast.error("Las horas mínimas deben ser un número válido");
      return;
    }

    startTransition(async () => {
      try {
        // Llama a la server action para crear el evento y los horarios
        const { event, weeklyHours } = convertFormToEvent(data);
        await createEvent(event, weeklyHours);

        toast.success("Evento creado correctamente");
        router.push(`/dashboard/businesses/${businessId}/events`);
      } catch {
        toast.error("Hubo un problema al crear el evento");
      }
    });
  };

  // Navega hacia atrás al dashboard de eventos
  const handleGoBack = () => {
    router.push('/dashboard/businesses/' + businessId + '/events');
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        {/* Botón para volver atrás */}
        <Button variant="ghost" onClick={handleGoBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a eventos
        </Button>
        <h1 className="text-3xl font-bold">Crear nuevo evento</h1>
        <p className="text-muted-foreground mt-2">Configura los detalles de tu evento de cita</p>
      </div>

      {/* DEBUG: Mostrar errores de RHF en pantalla */}
      {/**
      <pre style={{color: 'red', fontSize: 12}}>
        {JSON.stringify(form.formState.errors, null, 2)}
      </pre>
      **/}

      <Card>
        <CardHeader>
          <CardTitle>Configuración del evento</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formulario principal usando React Hook Form */}
          <Form {...form}>
            <form
              onClick={() => console.log('Form clicked')}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8" noValidate>
              {/* Secciones del formulario (deben tener campos conectados a RHF) */}
              <EventDetailsSection form={form} />
              <AvailabilitySection form={form} />
      <EventUrlSection form={form} businessSlug={businessSlug} baseUrl={getBaseUrl()} />
              {/* Campo hidden para business_id, necesario para la server action */}
              <input type="hidden" {...form.register('business_id')} />
              <div className="flex justify-end pt-6 border-t">
                {/* Botón de submit, muestra loading si isPending */}
                <Button type="submit" disabled={!form.formState.isValid || isPending} className="w-full sm:w-auto">
                  {isPending ? "Creando..." : "Crear evento"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}