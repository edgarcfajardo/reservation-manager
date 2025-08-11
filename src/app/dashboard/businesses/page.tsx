
import DashboardContentBusiness from '@/components/dashboard-business/DashboardContentBusiness';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'

export default async function BusinessesPage() {

  return (
    <>
      < SidebarProvider >
        < AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          < DashboardHeader />
          < DashboardContentBusiness />
        </main>
      </SidebarProvider>
    </>
  )
}
