"use server";

import { createNewAppointment } from "@/server/database/appointments";
import { redirect } from "next/navigation";

/**
 * Server action que recibe un FormData (desde un <form action={createAppointmentAction}>)
 * y crea la cita usando createNewAppointment.
 *
 * IMPORTANTE: aquí puedes añadir el envío de correo después de insertar en BD.
 */
export async function createAppointmentAction(formData: FormData) {
  const businessId = String(formData.get("businessId") || "");
  const eventId = String(formData.get("eventId") || "");
  const businessSlug = String(formData.get("businessSlug") || "");
  const eventSlug = String(formData.get("eventSlug") || "");
  const fullName = String(formData.get("fullName") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const date = String(formData.get("date") || "");
  const time = String(formData.get("time") || "");

  // Validaciones básicas
  if (!eventId) {
    redirect(`/${businessSlug}/${eventSlug}/result?success=0`);
  }

  // Construye payload para la función de DB
  const payload = {
    businessId,
    eventId,
    fullName,
    email,
    phone,
    date,
    time,
  };

  type AppointmentResult = {
    data?: unknown;
    error?: string | { message?: string; [key: string]: unknown };
  };

  const result: AppointmentResult = await createNewAppointment(payload);

  if (result?.error) {
    redirect(`/${businessSlug}/${eventSlug}/result?success=0`);
  }

  // Redirige a la página de resultado amigable con slugs
  redirect(`/${businessSlug}/${eventSlug}/result?success=1`);
}
