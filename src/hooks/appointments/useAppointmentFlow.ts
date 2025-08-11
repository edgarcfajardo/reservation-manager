"use client";

import { useState, useCallback } from "react";
import type {
  AppointmentFlowState,
  FlowStep,
  User,
  Appointment,
} from "@/types/appointment"; // Asegúrate que tengas estos tipos o los defines

// Hook personalizado para manejar el flujo de citas
export function useAppointmentFlow() {
  const [state, setState] = useState<AppointmentFlowState>({
    currentStep: "email",
    user: {},
    business: undefined,
    event: undefined,
    existingAppointment: undefined,
    selectedDate: undefined,
    selectedTime: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Simula la verificación del usuario por email
  const checkUserByEmail = useCallback(async (email: string): Promise<User> => {
    setIsLoading(true);

    // Simulación de llamada API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulación de lógica de usuario recurrente o nuevo
    const isRecurrent = email.includes("recurrent");
    const hasActiveAppointment = email.includes("active");

    const user: User = {
      email,
      isNew: !isRecurrent && !hasActiveAppointment,
      isRecurrent: isRecurrent && !hasActiveAppointment,
      ...(isRecurrent && {
        fullName: "Juan Pérez",
        phone: "+1234567890",
      }),
    };

    setIsLoading(false);
    return user;
  }, []);

  // Determina el siguiente paso basado en el estado del usuario
  const determineNextStep = useCallback(
    (user: User, hasActiveAppointment?: boolean): FlowStep => {
      if (hasActiveAppointment) return "active-appointment";
      if (user.isNew) return "personal-data";
      if (user.isRecurrent) return "data-validation";
      return "time-selection";
    },
    []
  );

  // Navega al siguiente paso y puede actualizar parte del estado
  const goToNextStep = useCallback(
    (step: FlowStep, data?: Partial<AppointmentFlowState>) => {
      setState((prev) => ({
        ...prev,
        currentStep: step,
        ...data,
      }));
    },
    []
  );

  // Procesa el email, verifica usuario y define siguiente paso
  const processEmail = useCallback(
    async (email: string) => {
      const user = await checkUserByEmail(email);
      const hasActiveAppointment = email.includes("active");

      const nextStep = determineNextStep(user, hasActiveAppointment);

      setState((prev) => ({
        ...prev,
        user,
        currentStep: nextStep,
        ...(hasActiveAppointment && {
          existingAppointment: {
            id: "1",
            userId: user.id || "1",
            eventId: prev.event?.id || "event-1",
            date: "2024-01-15",
            time: "10:00",
            status: "confirmed",
          } as Appointment,
        }),
      }));
    },
    [checkUserByEmail, determineNextStep]
  );

  // Guarda datos personales y avanza a selección de tiempo
  const savePersonalData = useCallback((data: { fullName: string; phone: string }) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...data,
      },
      currentStep: "time-selection",
    }));
  }, []);

  // Valida datos del usuario recurrente y avanza a selección de tiempo
  const validateUserData = useCallback((confirmPhone: boolean, newPhone?: string) => {
    setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...(newPhone && { phone: newPhone }),
      },
      currentStep: "time-selection",
    }));
  }, []);

  // Selecciona fecha y hora, avanza a confirmación
  const selectDateTime = useCallback((date: string, time: string) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
      selectedTime: time,
      currentStep: "confirmation",
    }));
  }, []);

  // Confirma la cita (simulado)
  const confirmAppointment = useCallback(async () => {
    setIsLoading(true);

    // Simulación de creación de cita
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    // Aquí puedes agregar lógica para redirigir o mostrar mensaje
  }, []);

  return {
    state,
    isLoading,
    processEmail,
    savePersonalData,
    validateUserData,
    selectDateTime,
    confirmAppointment,
    goToNextStep,
  };
}
