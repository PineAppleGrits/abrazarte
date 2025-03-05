import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClientTestimonialsList from "./TestimonialList";
import prisma from "@/prisma";

export default async function Testimonios() {
  const featuredTestimonials = await prisma.testimonial.findMany({
    take: 10,
  });

  return (
    <>
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Testimonios</h1>
            <p className="text-lg text-gray-700">
              Descubre las experiencias de familias que encontraron el lugar ideal para sus seres queridos a través de Find Care.
            </p>
          </div>
        </div>
      </div>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Más testimonios de nuestros usuarios</h2>
          <ClientTestimonialsList testimonials={featuredTestimonials} />
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/5 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Has utilizado nuestros servicios?</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Nos encantaría conocer tu experiencia. Compartir tu testimonio puede ayudar a otras familias que están pasando
                  por el mismo proceso.
                </p>
                <Button size="lg">Compartir mi experiencia</Button>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Comparte+tu+experiencia"
                  alt="Comparte tu experiencia"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para encontrar el lugar ideal?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Únete a cientos de familias que han encontrado la residencia perfecta para sus seres queridos a través de Find Care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buscar-geriatrico">
              <Button size="lg" className="w-full sm:w-auto">
                Buscar geriátrico
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contactar con un asesor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
