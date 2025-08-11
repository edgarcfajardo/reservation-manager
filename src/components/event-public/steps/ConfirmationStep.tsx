// components/event-public/steps/ConfirmationStep.tsx

"use client";

interface ConfirmationStepProps {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

export default function ConfirmationStep({
  fullName,
  email,
  phone,
  date,
  time,
}: ConfirmationStepProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Cita confirmada ✅</h2>
      <p>Gracias, <strong>{fullName}</strong>. Hemos registrado tu cita.</p>
      <ul className="mt-3 text-sm">
        <li><strong>Fecha:</strong> {date}</li>
        <li><strong>Hora:</strong> {time}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Teléfono:</strong> {phone}</li>
      </ul>
      <p className="mt-4 text-green-600">Te enviaremos un correo con los detalles.</p>
    </div>
  );
}
