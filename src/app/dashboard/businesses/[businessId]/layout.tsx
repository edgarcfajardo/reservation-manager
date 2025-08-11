import { AppSidebar } from "@/components/dashboard/AppSidebar"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import { SidebarProvider } from "@/components/ui/sidebar"

interface BusinessLayoutProps {
  children: React.ReactNode
  params : Promise<{ businessId: string }>
}

export default async function BusinessLayout({
  children,
  params
}: BusinessLayoutProps) {
  const { businessId } = await params;
  return (
    <SidebarProvider>
      <AppSidebar businessId={businessId} />
      <main className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader businessId={businessId} />
        {children}
      </main>
    </SidebarProvider>
  );
}
