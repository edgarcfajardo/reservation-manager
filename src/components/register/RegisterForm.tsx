"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { signup } from "@/server/auth/login/actions"

interface LoginFormProps {
    isLoading?: boolean
}

export default function RegisterForm({ isLoading: externalLoading }: LoginFormProps) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [internalLoading, setInternalLoading] = useState(false)

    const isLoading = externalLoading || internalLoading

    const [errorText, setErrorText] = useState('')

    // Manejo del envío del formulario
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setInternalLoading(true)
        setErrorText('')  // Limpiar error antes de enviar

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            setErrorText("Las contraseñas no coinciden")
            toast.error("Error", {
                description: "Las contraseñas no coinciden",
                position: "top-center",
                closeButton: true
            })
            setInternalLoading(false)
            return
        }

        const error = await signup(email, password);

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
                <CardTitle className="text-2xl font-bold text-center">Registrate</CardTitle>
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

                    {/* Contraseña */}
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

                    {/* Confirmar contraseña */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirmar Contraseña
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10 pr-10 h-12"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-gray-600 text-center">
                            Se te enviará un correo con un enlace para activar tu cuenta.
                        </p>
                    </div>

                    {/* Botón de registro */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Registrando...</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <span>Registrarme</span>
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
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-1">
                <div className="text-center text-sm text-gray-600">
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                        Ya tengo una cuenta
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
