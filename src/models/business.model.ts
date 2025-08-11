// Revisar y eliminar
export interface BusinessModel {
  id: string; // UUID
  owner_id: string; // UUID referencing auth.users
  name: string;
  slug: string; // Unique slug like 'opticadelvalle'
}