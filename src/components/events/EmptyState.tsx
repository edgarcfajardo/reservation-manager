"use client"

import { Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface EmptyStateProps {
  businessId: string
}

export function EmptyState({ businessId }: EmptyStateProps) {
  const router = useRouter()

  const handleCreateEvent = () => {
    try {
      // Redirige correctamente usando router.push (no es necesario await)
      router.push(`/dashboard/businesses/${businessId}/events/create`)
      // Fallback: Si no se redirige después de 1 segundo, forzar la redirección absoluta
      setTimeout(() => {
        if (!window.location.pathname.includes(`/dashboard/businesses/${businessId}/events/create`)) {
          window.location.href = `/dashboard/businesses/${businessId}/events/create`
        }
      }, 1000)
    } catch {
      toast.error('Error al redirigir')
      window.location.href = `/dashboard/businesses/${businessId}/events/create`
    }
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Calendar className="h-8 w-8 text-muted-foreground" />
        </div>

        <h3 className="text-xl font-semibold mb-2">No tienes eventos creados</h3>

        <p className="text-muted-foreground mb-6 max-w-md">
          Crea tu primer evento para comenzar a recibir reservas de tus clientes. Es rápido y fácil de configurar.
        </p>
        <Button onClick={handleCreateEvent} className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Crear mi primer evento
        </Button>
      </CardContent>
    </Card>
  )
}

