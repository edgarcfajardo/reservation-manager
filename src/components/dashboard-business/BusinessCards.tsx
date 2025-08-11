"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { BusinessModel } from "@/models/business.model";
import { getAllBusinesses } from "@/server/database/businesses";
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function BusinessCards() {

    const [businesses, setBusinesses] = useState<BusinessModel[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const router = useRouter();

    useEffect(() => {

        getBusinesses()

    }, [])

    const getBusinesses = async () => {
        setLoading(true);
        let businesses: BusinessModel[] = [];
        businesses = await getAllBusinesses();

        setBusinesses(businesses);

        setLoading(false);
    }

    const onClickBusiness = (id: string) => {
        router.push(`/dashboard/businesses/${id}/events`);
    }
    

    return (
        <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {businesses.map((business, index) => (
                        <Card onClick={() => onClickBusiness(business.id)} key={index} 
                        className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{business.name}</CardTitle>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{business.slug}</div>
                                {/* 
                                <p className="text-xs text-muted-foreground">{business.owner_id}</p>
                                */}
                            </CardContent>
                        </Card>
                    ))}

            </div>
            {loading && (
                <div className="w-full">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Skeleton className="w-full h-40" />
                        <Skeleton className="w-full h-40" />
                        <Skeleton className="w-full h-40" />
                        <Skeleton className="w-full h-40" />
                    </div>
                </div>
            )}
        </>
    )
}
        
            
        
    
