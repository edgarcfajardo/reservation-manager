
import { TableAppointments } from '@/components/appointments/TableAppointments'
import React from 'react'

interface AppointmentPageProps {
  params : Promise<{ businessId: string }>
}


export default async function AppointmentPage({ params }: AppointmentPageProps) {
  const { businessId } = await params

  return (
    <div className="hidden flex-col md:flex">
            <main className='w-full space-y-4 p-8 pt-6 max-w-7xl mx-auto'>
                <h2>Citas</h2>
                <hr />
                < TableAppointments businessId={businessId}/>
            </main>
        </div>
  )
}
