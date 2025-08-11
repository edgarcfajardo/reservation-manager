import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { Feature } from "@/components/landing/Features"
import { Business } from "@/components/landing/Services"
import { Plans } from "@/components/landing/Pricing"
import { Testimonials } from "@/components/landing/Testimonials"
import { FAQ } from "@/components/landing/FAQ"
import { CTA } from "@/components/landing/CTA"
import { Contact } from "@/components/landing/Contact"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      < Header />
      <main>
        {/* Hero Section */}
        < Hero />

        {/* Características destacadas */}
        < Feature />

        {/* Busines */}
        < Business />

        {/* Planes y precios */}
        < Plans />

        {/* Testimonios */}
        < Testimonials />

        {/* FAQ */}
        < FAQ />

        {/* CTA Final */}
        < CTA />

        {/* Contacto */}
        < Contact />
      </main>

      {/* Footer */}
      < Footer />
    </div>
  )
}
