import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { DashboardContent } from "@/components/dashboard/DashboardContent"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <DashboardHeader />
      <DashboardContent />
      {/* Contenido principal del dashboard */}
      <div className="p-6">
        <h1>Dashboard Principal</h1>
      </div>
    </SidebarProvider>
      
    </>
  )
}