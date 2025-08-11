import AppBranding from '@/components/landing/AppBranding'
import RegisterForm from '@/components/register/RegisterForm'
import React from 'react'

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo y branding */}
                <AppBranding className="mb-8" />

                {/* Formulario de login */}
                <RegisterForm />

            </div>
        </div>
    )
}
