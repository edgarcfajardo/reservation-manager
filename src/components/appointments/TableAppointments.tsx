"use client";

import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Skeleton } from '@/components/ui/skeleton';
import { AppointmentModel } from '@/models/appointment.model';
import { getAllAppointments } from '@/server/database/appointments';

interface TableAppointmentsProps {
    businessId: string;
}

export const TableAppointments = ({ businessId }: TableAppointmentsProps) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [appointments, setAppointments] = useState<AppointmentModel[]>([]);

    useEffect(() => {
        const getAppointments = async () => {
            setLoading(true);
            const appointments = await getAllAppointments(businessId);
            setAppointments(appointments);
            setLoading(false);
        };

        getAppointments();
    }, [businessId]);

    return (
        <div>
            <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Correo</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Hora</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        appointments.map((appointment, index) => (
                            <TableRow key={index}>
                                <TableCell>{appointment.client_full_name}</TableCell>
                                <TableCell>{appointment.client_email}</TableCell>
                                <TableCell>{appointment.client_phone}</TableCell>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>{appointment.time}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            {loading && (
                <div className='w-full'>
                    <Skeleton className='w-full h-5' />
                    <Skeleton className='w-full h-5 mt-2' />
                    <Skeleton className='w-full h-5 mt-2' />
                </div>
            )}
        </div>
    )
}
