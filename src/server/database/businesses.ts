"use server"

import { BusinessModel } from "@/models/business.model"
import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "../auth/login/actions";


// Read / todos los negocios del usuario autenticado
export const getAllBusinesses = async () => {
    const businessList : BusinessModel [] = [];

    const supabase = await createClient();

    const user = await getCurrentUser();

    const businessesResponse = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', user?.id)

    businessesResponse.data?.forEach((business : BusinessModel) => {
        businessList.push(business)
    })

    return businessList;
}

// Obtiene un solo negocio por id y owner_id, retorna el objeto o null
export const getBusinessById = async (id: string) => {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const businessResponse = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .eq('owner_id', user?.id)
        .single(); // Solo un objeto

    // Retorna el objeto de negocio o null si no existe
    return businessResponse.data ?? null;
}


// Crea un nuevo negocio
export const createBusiness = async (name: string, slug: string) => {
    const supabase = await createClient();
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from('businesses')
        .insert([
            {
                name,
                slug,
                owner_id: user?.id
            }
        ])
        .single();

    if (error) {
        throw error;
    }

    return data;
}