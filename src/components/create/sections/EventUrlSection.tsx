// Componente para mostrar y editar la URL del evento
"use client"

import type { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateEventFormData } from "../CreateEventForm"

interface EventUrlSectionProps {
  form: UseFormReturn<CreateEventFormData>
  businessSlug: string // Usar el slug directamente, no el id
  baseUrl?: string // Permite pasar el BASE_URL desde el padre
}

// Este componente debe ser Client Component, así que no puede usar async/await ni fetch directo
export function EventUrlSection({ form, businessSlug, baseUrl }: EventUrlSectionProps) {
  // Usar el BASE_URL recibido por props, fallback a localhost
  const urlPrefix = baseUrl ? `${baseUrl.replace(/\/$/, "")}/${businessSlug}/` : `http://localhost:3000/${businessSlug}/`;
  // Obtenemos el valor actual del slug del evento
  const slug = form.watch("slug")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">URL del evento</h3>
        <p className="text-sm text-muted-foreground">Define la URL personalizada para tu evento</p>
      </div>

      {/* Campo para el slug del evento */}
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug del evento *</FormLabel>
            <FormControl>
              <div className="flex">
                {/* Prefijo de la URL (slug del negocio) */}
                <div className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  {urlPrefix}
                </div>
                <Input placeholder="mi-evento" className="rounded-l-none" {...field} />
              </div>
            </FormControl>
            <FormDescription>
              {slug && (
                <span className="text-sm">
                  URL final:{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-xs">
                    {urlPrefix}
                    {slug}
                  </code>
                </span>
              )}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
