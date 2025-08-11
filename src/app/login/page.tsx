import LoginForm from "@/components/login/LoginForm"
import AppBranding from "@/components/landing/AppBranding"

export default async function LoginPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y branding */}
        <AppBranding className="mb-8" />

        {/* Formulario de login */}
        <LoginForm />

        {/* Información adicional */}
        {/*
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Problemas para acceder?{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 hover:underline">
              Contacta con soporte
            </Link>
          </p>
        </div>
        */}
      </div>
    </div>
  )
}
