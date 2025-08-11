import { CreateEventForm } from "@/components/create/CreateEventForm";
import { getBusinessById } from "@/server/database/businesses";

// El tipo correcto para los params en un route segment de Next.js es un objeto, no una promesa
interface CreateEventPageProps {
  params: Promise<{ businessId: string }>;
}


export default async function CreateEventPage({ params }: CreateEventPageProps) {
  const { businessId } = await params;

  const business = await getBusinessById(businessId);

  if (!business) {
    return <div>Negocio no encontrado</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {/* Pasamos el businessId y el businessSlug como props al formulario */}
      <CreateEventForm businessId={businessId} businessSlug={business.slug} />
    </div>
  );
}