import { Calendar } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export const Header = () => {
    return (
        <>
            {/* Header */}
            <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">Cita Manager</span>
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <Link href="#caracteristicas" className="text-gray-600 hover:text-cyan-500 transition-colors">
                                Características
                            </Link>
                            <Link href="#precios" className="text-gray-600 hover:text-cyan-500 transition-colors">
                                Precios
                            </Link>
                            <Link href="#contacto" className="text-gray-600 hover:text-cyan-500 transition-colors">
                                Contacto
                            </Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Link href={"/login"} className="bg-gray-800 hover:bg-gray-950 text-gray-100 hover:text-white 
                            py-2 px-5 rounded-lg">
                                Iniciar sesión
                            </Link>
                            {/*
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white py-5">Probar gratis</Button>
                            */}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
