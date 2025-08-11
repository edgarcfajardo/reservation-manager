"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventList } from "./EventList"
import { EmptyState } from "./EmptyState"
import type { EventUI } from "@/models/event.model"
import { useRouter } from "next/navigation"

interface Props {
  events: EventUI[]
  businessId : string
  businessSlug: string
}

export default function EventDashboardClient({ events: initialEvents, businessId, businessSlug }: Props) {
  const [events] = useState<EventUI[]>(initialEvents)
  const router = useRouter()

  const handleNewEvent = () => {
    router.push(`/dashboard/businesses/${businessId}/events/create`)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis eventos</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona y comparte tus eventos de calendario
          </p>
        </div>
        <Button onClick={handleNewEvent} className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Nuevo evento
        </Button>
      </div>

      {/* Content */}
      {events.length > 0 ? (
        <EventList events={events} businessSlug={businessSlug} />
      ) : (
        <EmptyState businessId={businessId} />
      )}
    </div>
  )
}