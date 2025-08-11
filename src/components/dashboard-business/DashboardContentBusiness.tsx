"use client"

import React from 'react'
import { BusinessCards } from './BusinessCards'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardContentBusiness() {

  const router = useRouter()
  const handleNewBusiness = () => {
    router.push(`/dashboard/businesses/create`)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
    <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Administra tus negocios</h1>
        </div>
        <Button onClick={handleNewBusiness}  className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Nuevo negocio
        </Button>
      </div>
    <div>
          <BusinessCards />
        </div>
    </div>
  )
}
