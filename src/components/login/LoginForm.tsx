"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { login } from "@/server/auth/login/actions"

interface LoginFormProps {
  isLoading?: boolean
}

export default function LoginForm({ isLoading: externalLoading }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [internalLoading, setInternalLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const isLoading = externalLoading || internalLoading

  // Corregí el nombre de la función de onSubmi a onSubmit
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setInternalLoading(true)
    setErrorText('')

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const error = await login(email, password)

    if (error) {
      setErrorText(error.message)
      toast.error("Error", {
        description: error.message,
        position: "top-center",
        closeButton: true
      })
    }

    setInternalLoading(false)
  }

  return (
    <Card className="shadow-xl border-0 w-full max-w-md">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center text-gray-600">Accede a tu panel de control</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
          {
            errorText && (
              <div className="text-sm text-red-500">{errorText}</div>
            )
          }
        </form>

        {/* Resto del código comentado */}
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 pt-1">
        <div className="text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
            Regístrate gratis
          </Link>
        </div>

        <div className="flex justify-center space-x-6 text-xs text-gray-500 mt-1">
          <Link href="/terms-and-conditions" className="hover:text-gray-700 hover:underline">
            Terminos y condiciones
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
