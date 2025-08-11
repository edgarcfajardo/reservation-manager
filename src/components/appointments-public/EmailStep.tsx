"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { emailSchema, type EmailFormData } from "@/lib/validations/appointment"
import { Loader2 } from "lucide-react"
import Link from "next/link"


interface EmailStepProps {
  onSubmit: (email: string) => Promise<void>
  isLoading: boolean
}

/**
 * Componente para capturar el email del usuario
 * Incluye validación en tiempo real y términos y condiciones
 */
export function EmailStep({ onSubmit, isLoading }: EmailStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  })

  const handleFormSubmit = async (data: EmailFormData) => {
    await onSubmit(data.email)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Reserva tu cita</CardTitle>
        <CardDescription>Ingresa tu email para comenzar el proceso de reserva</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verificando...
              </>
            ) : (
              "Continuar"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Al continuar, aceptas nuestros{" "}
            <Link href={"/terms-and-conditions"} className="underline hover:text-primary">
              términos y condiciones
            </Link>
            {/*}
            {" "}
            y{" "}
            <a href="#" className="underline hover:text-primary">
              política de privacidad
            </a>
            */}
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
