export interface AppointmentModel {
    id?: string; // opcional, útil si viene de la base de datos
    event_id: string;
    client_full_name: string;
    client_email: string;
    client_phone: string;
    date: string; // formato: 'YYYY-MM-DD'
    time: string; // formato: 'HH:mm'
    status: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface AppointmentCreateModel {
    eventId: string;
    fullName: string;
    email: string;
    phone: string;
    date: string;
    time: string;
}