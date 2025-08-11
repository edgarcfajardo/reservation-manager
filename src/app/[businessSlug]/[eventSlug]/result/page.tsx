"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 max-w-md">
        {success ? (
          <>
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold text-gray-900">¡Cita agendada correctamente!</h1>
            <p className="text-gray-600">Recibirás un correo de confirmación con los detalles de tu cita.</p>
            <Link href="/">
              <Button className="mt-4">Volver al inicio</Button>
            </Link>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">No se pudo agendar la cita</h1>
            <p className="text-gray-600">Ocurrió un error al intentar registrar tu cita. Por favor, verifica los datos e intenta nuevamente.</p>
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="outline" onClick={() => {
                // Redirige al formulario de agendar cita (no solo cambia el success)
                window.location.href = window.location.pathname.replace(/\/result.*/, "");
              }}>Volver a intentar</Button>
              <Link href="/">
                <Button>Volver al inicio</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
