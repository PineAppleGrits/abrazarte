import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gracias por tu mensaje | Abrazarte",
  description: "Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.",
  robots: "noindex, nofollow",
}

export default function GraciasPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-2xl">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">¡Gracias por contactarnos!</h1>

        <p className="text-xl text-gray-700 mb-8">
          Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y se pondrá en contacto contigo lo antes
          posible.
        </p>

        <div className="bg-brand-3/30 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">¿Qué sucede ahora?</h2>
          <ul className="text-left space-y-3 text-lg">
            <li className="flex items-start">
              <span className="bg-brand/20 p-1 rounded-full mr-3 mt-1">
                <CheckCircle className="h-4 w-4 text-brand" />
              </span>
              Revisaremos tu consulta en las próximas 24-48 horas hábiles
            </li>
            <li className="flex items-start">
              <span className="bg-brand/20 p-1 rounded-full mr-3 mt-1">
                <CheckCircle className="h-4 w-4 text-brand" />
              </span>
              Te contactaremos por teléfono o email para brindarte la información que necesitas
            </li>
            <li className="flex items-start">
              <span className="bg-brand/20 p-1 rounded-full mr-3 mt-1">
                <CheckCircle className="h-4 w-4 text-brand" />
              </span>
              Nuestros asesores te ayudarán a encontrar la mejor opción para tu ser querido
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" size="lg" className="text-lg w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver al inicio
            </Button>
          </Link>

          <Link href="/buscar-geriatrico">
            <Button size="lg" className="text-lg w-full sm:w-auto">
              <Home className="mr-2 h-5 w-5" />
              Buscar geriátrico
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

