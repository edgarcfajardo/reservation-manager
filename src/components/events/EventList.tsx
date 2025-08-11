import type { EventUI } from "@/models/event.model"
import { EventItem } from "./EventItem"

interface EventListProps {
  events: EventUI[]
  businessSlug: string
}

export function EventList({ events, businessSlug }: EventListProps) {
  return (
    <div className="space-y-4">
      {events.map(event => (
        <EventItem key={event.id} event={event} businessSlug={businessSlug} />
      ))}
    </div>
  )
}
