import { getBusinessById } from "@/server/database/businesses"
import { SidebarTrigger } from "../ui/sidebar"

interface DashboardHeaderProps {
  businessId?: string  
}

export default async function DashboardHeader({ businessId }: DashboardHeaderProps) {
  // Si no hay businessId, mostrar vista genérica
  if (!businessId) {
    return (
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Mis negocios</h1>
        </div>
      </header>
    )
  }

  const business = await getBusinessById(businessId)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">
          {business?.name ?? `Negocio ${businessId}`}
        </h1>
      </div>
    </header>
  )
}