'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(email: string, password: string) {
  const supabase = await createClient();

  // Validación básica de email y password
  if (!email || !email.includes('@')) {
    return { success: false, error: 'El email es invalido' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: error.message || 'No se pudo iniciar sesión' };
  }

  revalidatePath('/', 'layout');
  // No redirigir desde el server action, deja que el cliente lo haga
  return { success: true };
}



export const logout = async () => {
  const supabase = await createClient()

  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}



export async function signup(email: string, password: string) {
  const supabase = await createClient();

  // Validación básica de email y password
  if (!email || !email.includes('@')) {
    return { success: false, error: 'El email es invalido' };
  }
  if (!password || password.length < 6) {
    return { success: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    // Devuelve el mensaje real del error de Supabase
    return { success: false, error: error.message || 'No se pudo registrar el usuario' };
  }

  revalidatePath('/', 'layout');
  // No redirigir desde el server action, deja que el cliente lo haga
  return { success: true };
}


export const getCurrentUser = async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}