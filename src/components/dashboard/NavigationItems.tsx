import { Settings, Bell, Building2, CalendarCheck, CalendarDays } from "lucide-react";

interface NavigationItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface BusinessMenuProps {
  businessId: string;
}

// Elementos de Dashboard General
export const dashboardMenuItems: NavigationItem[] = [
  {
    title: "Mis negocios",
    url: "/dashboard/businesses",
    icon: Building2,
  },
];

// Función que genera los elementos del menú para un negocio específico
export const getBusinessMenuItems = ({ businessId }: BusinessMenuProps): NavigationItem[] => [
  {
    title: "Mis eventos",
    url: `/dashboard/businesses/${businessId}/events`,
    icon: CalendarDays,
  },
  {
    title: "Citas",
    url: `/dashboard/businesses/${businessId}/appointments`,
    icon: CalendarCheck,
  },
  {
    title: "Volver a mis negocios",
    url: "/dashboard/businesses",
    icon: Building2,
  },
];

// Elementos de configuración (comunes)
export const settingsMenuItems: NavigationItem[] = [
  {
    title: "Mi perfil",
    url: "/dashboard/settings/profile",
    icon: Settings,
  },
  {
    title: "Notificaciones",
    url: "/dashboard/settings/notifications",
    icon: Bell,
  },
];

{/*
  {
    title: "Configuración",
    url: "#",
    icon: Settings,
  },
  {
    title: "Notificaciones",
    url: "#",
    icon: Bell,
  },
  {
    title: "Facturación",
    url: "#",
    icon: CreditCard,
  },
  */}