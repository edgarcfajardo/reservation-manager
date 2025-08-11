"use client"

import { useState } from "react"
import { Link2, Calendar, Clock, MapPin, Phone, Video } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { EventUI } from "@/models/event.model"
import { toast } from "sonner"

interface EventItemProps {
  event: EventUI
  businessSlug: string
}

export function EventItem({ event, businessSlug }: EventItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  const getLocationIcon = (type: EventUI["locationType"]) => {
    switch (type) {
      case "in-person":
        return <MapPin className="h-4 w-4" />
      case "phone":
        return <Phone className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
    }
  }

  const getLocationLabel = (type: EventUI["locationType"]) => {
    switch (type) {
      case "in-person":
        return "En persona"
      case "phone":
        return "Llamada"
      case "video":
        return "Videollamada"
    }
  }

  const getDurationText = (duration: number, type: EventUI["durationType"]) => {
    if (type === "hours") {
      return `${duration} ${duration === 1 ? "hora" : "horas"}`
    }
    return `${duration} ${duration === 1 ? "minuto" : "minutos"}`
  }

  const handleCopyLink = async () => {
    setIsLoading(true)
    try {
      let url = event.link;
      // Si event.link ya es una URL absoluta, la usamos tal cual
      if (!/^https?:\/\//.test(event.link)) {
        // Si es un slug, construimos la URL pública
        const cleanSlug = event.link.replace(/^\//, '');
        url = `${window.location.origin}/${businessSlug}/${cleanSlug}`;
      }
      await navigator.clipboard.writeText(url)
      toast.success("Enlace copiado")
    } catch {
      toast.error("No se pudo copiar el enlace")
    } finally {
      setIsLoading(false)
    }
  }

  {/*
  const handleEdit = () => {
    console.log("Editar evento:", event.id)
  }

  
  const handleDuplicate = () => {
    console.log("Duplicar evento:", event.id)
  }
 

  const handleDelete = () => {
    console.log("Eliminar evento:", event.id)
  }
  */}

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4">
              {/* Información del evento */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-2 truncate">{event.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{getDurationText(event.duration, event.durationType)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {getLocationIcon(event.locationType)}
                    <span>{getLocationLabel(event.locationType)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{event.scheduleDescription}</span>
                </div>

                {/* Acciones en móvil */}
                <div className="flex items-center gap-2 sm:hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Link2 className="h-4 w-4" />
                    Copiar enlace
                  </Button>

                  {/*
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDuplicate}>Duplicar</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  */}
                </div>
              </div>
            </div>
          </div>

          {/* Acciones en desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              disabled={isLoading}
              className="flex items-center gap-2 bg-transparent"
            >
              <Link2 className="h-4 w-4" />
              Copiar enlace
            </Button>

            {/*
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDuplicate}>Duplicar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            */}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
