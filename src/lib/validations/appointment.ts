import { z } from "zod"

// Esquemas de validación centralizados
export const emailSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Ingresa un email válido"),
})

export const personalDataSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres"),
  phone: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .regex(/^\+?[\d\s-()]+$/, "Formato de teléfono inválido"),
})

export const dataValidationSchema = z
  .object({
    confirmPhone: z.boolean(),
    phone: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.confirmPhone && !data.phone) {
        return false
      }
      if (!data.confirmPhone && data.phone) {
        return data.phone.length >= 10
      }
      return true
    },
    {
      message: "Debes confirmar el teléfono o proporcionar uno nuevo",
      path: ["phone"],
    },
  )

export type EmailFormData = z.infer<typeof emailSchema>
export type PersonalDataFormData = z.infer<typeof personalDataSchema>
export type DataValidationFormData = z.infer<typeof dataValidationSchema>
