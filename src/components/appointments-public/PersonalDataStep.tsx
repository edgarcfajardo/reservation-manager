"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { personalDataSchema, type PersonalDataFormData } from "@/lib/validations/appointment"

interface PersonalDataStepProps {
  onSubmit: (data: PersonalDataFormData) => void
  userEmail: string
}

/**
 * Componente para capturar datos personales de usuarios nuevos
 * Solicita nombre completo y número de teléfono
 */
export function PersonalDataStep({ onSubmit, userEmail }: PersonalDataStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalDataFormData>({
    resolver: zodResolver(personalDataSchema),
    mode: "onChange",
  })

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Completa tu perfil</CardTitle>
        <CardDescription>Necesitamos algunos datos para completar tu reserva</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Email confirmado:</p>
          <p className="font-medium">{userEmail}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              placeholder="Juan Pérez"
              {...register("fullName")}
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Número de teléfono</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={!isValid}>
            Continuar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
