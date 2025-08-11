"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { dataValidationSchema, type DataValidationFormData } from "@/lib/validations/appointment"
import type { User } from "@/types/appointment"

interface DataValidationStepProps {
  user: Partial<User>
  onSubmit: (confirmPhone: boolean, newPhone?: string) => void
}

/**
 * Componente para validar datos de usuarios recurrentes
 * Permite confirmar o actualizar el número de teléfono
 */
export function DataValidationStep({ user, onSubmit }: DataValidationStepProps) {
  const [phoneConfirmation, setPhoneConfirmation] = useState<"yes" | "no" | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }, // isValid no se usa
  } = useForm<DataValidationFormData>({
    resolver: zodResolver(dataValidationSchema),
    mode: "onChange",
    defaultValues: {
      confirmPhone: true,
    },
  })

  const handleFormSubmit = (data: DataValidationFormData) => {
    onSubmit(data.confirmPhone, data.phone)
  }

  const handlePhoneConfirmationChange = (value: string) => {
    const confirmation = value as "yes" | "no"
    setPhoneConfirmation(confirmation)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>¡Hola {user.fullName}!</CardTitle>
        <CardDescription>Verificamos tus datos para agilizar el proceso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Tu información:</p>
          <p className="font-medium">{user.email}</p>
          <p className="font-medium">{user.phone}</p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">¿Sigue siendo tu número de teléfono?</Label>

            <RadioGroup
              value={phoneConfirmation || ""}
              onValueChange={handlePhoneConfirmationChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="cursor-pointer">
                  Sí, es correcto
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="cursor-pointer">
                  No, quiero cambiarlo
                </Label>
              </div>
            </RadioGroup>
          </div>

          {phoneConfirmation === "no" && (
            <div className="space-y-2">
              <Label htmlFor="newPhone">Nuevo número de teléfono</Label>
              <Input
                id="newPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={phoneConfirmation === null}>
            Continuar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
