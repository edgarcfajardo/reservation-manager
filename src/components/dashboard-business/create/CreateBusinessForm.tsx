"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createBusiness } from '@/server/database/businesses'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tusitio.com'

export const CreateBusinessForm = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({ name: '', slug: '' })
  const [errors, setErrors] = useState({ name: '', slug: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { name: '', slug: '' }

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del negocio es requerido'
      valid = false
    } else if (formData.name.length > 50) {
      newErrors.name = 'El nombre no puede exceder 50 caracteres'
      valid = false
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'El slug es requerido'
      valid = false
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Solo letras minúsculas, números y guiones'
      valid = false
    } else if (formData.slug.length > 30) {
      newErrors.slug = 'El slug no puede exceder 30 caracteres'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await createBusiness(formData.name, formData.slug)
      toast.success('Negocio creado exitosamente!')
      router.push('/dashboard/businesses')
    } catch (error: unknown) {

      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message?: unknown }).message === 'string'
      ) {
        const message = (error as { message: string }).message
        if (message.includes('duplicate key value')) {
          setErrors(prev => ({ ...prev, slug: 'Este slug ya está en uso.' }))
          toast.error('El slug ya está en uso.')
        } else {
          toast.error('Error al crear el negocio: ' + message)
        }
      } else {
        toast.error('Error desconocido al crear el negocio')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Negocio</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name">Nombre del Negocio *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Mi Salón de Belleza"
              maxLength={50}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="slug">URL única (slug) *</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="ej: mi-salon"
              maxLength={30}
            />
            {errors.slug && <p className="text-sm text-red-500 mt-1">{errors.slug}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Solo letras minúsculas, números y guiones.
            </p>
            <p className="text-sm mt-2 text-gray-700 font-medium">
              Vista previa: <span className="text-blue-600">{`${baseUrl}/${formData.slug || 'mi-negocio'}`}</span>
            </p>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Creando...' : 'Crear Negocio'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
