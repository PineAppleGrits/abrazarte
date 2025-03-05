import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function QuienesSomos() {
  return (
    <>
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">¿Quiénes Somos?</h1>
              <p className="text-lg text-gray-700 mb-6">
                Find Care nació con una misión clara: ayudar a las familias a encontrar el mejor cuidado para sus seres queridos
                mayores, simplificando un proceso que suele ser complejo y emocionalmente desafiante.
              </p>
              <p className="text-lg text-gray-700">
                Entendemos que cada adulto mayor tiene necesidades únicas, y cada familia merece tranquilidad sabiendo que han
                tomado la mejor decisión posible.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="Equipo de Find Care" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-lg text-gray-700">
              Find Care fue fundada en XXXX por un grupo de profesionales que experimentaron personalmente los desafíos de
              encontrar el cuidado adecuado para sus padres y abuelos. Frustrados por la falta de información centralizada y
              transparente, decidieron crear una solución que ayudara a otras familias en situaciones similares.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Transparencia</h3>
              <p className="text-gray-600">
                Proporcionamos información clara y honesta sobre cada residencia geriátrica, incluyendo precios, servicios y
                opiniones reales de otras familias.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Empatía</h3>
              <p className="text-gray-600">
                Entendemos lo difícil que puede ser esta transición. Nuestro equipo está capacitado para brindar apoyo y
                orientación con sensibilidad.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Calidad</h3>
              <p className="text-gray-600">
                Verificamos cuidadosamente cada residencia en nuestra plataforma para asegurar que cumpla con altos estándares de
                cuidado y atención.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Transformar la forma en que las familias encuentran y eligen residencias geriátricas, proporcionando información
                  completa, transparente y personalizada que facilite tomar la mejor decisión para sus seres queridos.
                </p>
                <h2 className="text-3xl font-bold mb-4 mt-8">Nuestra Visión</h2>
                <p className="text-lg text-gray-700">
                  Ser la plataforma líder en Argentina que conecta a familias con las mejores opciones de cuidado para adultos
                  mayores, mejorando la calidad de vida de miles de personas y brindando tranquilidad a sus familias.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image src="/placeholder.svg?height=300&width=500" alt="Misión y visión" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {[
              {
                name: "Pepe",
                role: "Fundador y CEO",
                bio: "Pepe es un emprendedor apasionado por la tecnología y el impacto social. Con más de 10 años de experiencia en el sector, lidera el equipo de Find Care con visión y determinación.",
              },
              {
                name: "Pepe",
                role: "Fundador y CEO",
                bio: "Pepe es un emprendedor apasionado por la tecnología y el impacto social. Con más de 10 años de experiencia en el sector, lidera el equipo de Find Care con visión y determinación.",
              },
              {
                name: "Pepe",
                role: "Fundador y CEO",
                bio: "Pepe es un emprendedor apasionado por la tecnología y el impacto social. Con más de 10 años de experiencia en el sector, lidera el equipo de Find Care con visión y determinación.",
              },
              {
                name: "Pepe",
                role: "Fundador y CEO",
                bio: "Pepe es un emprendedor apasionado por la tecnología y el impacto social. Con más de 10 años de experiencia en el sector, lidera el equipo de Find Care con visión y determinación.",
              },
            ].map((member, index) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm max-w-xs">
                <div className="h-64 relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(member.name)}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Cómo Trabajamos?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            En Find Care, nos dedicamos a simplificar el proceso de búsqueda y selección de residencias geriátricas, brindando
            herramientas y recursos para que las familias tomen decisiones informadas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Evaluación de Necesidades</h3>
              <p className="text-gray-600">
                Analizamos las necesidades específicas del adulto mayor y las preferencias de la familia para ofrecer opciones
                personalizadas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Verificación de Calidad</h3>
              <p className="text-gray-600">
                Visitamos y evaluamos cada residencia en nuestra plataforma para garantizar que cumplan con nuestros estándares de
                calidad.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Acompañamiento Continuo</h3>
              <p className="text-gray-600">
                Brindamos apoyo durante todo el proceso, desde la búsqueda inicial hasta después de la elección final.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-primary/5 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">¿Tienes preguntas?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Nuestro equipo está disponible para ayudarte en cada paso del camino. No dudes en contactarnos para obtener más
              información sobre nuestros servicios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto">
                <Button size="lg" className="w-full sm:w-auto">
                  Contactar ahora
                </Button>
              </Link>
              <Link href="/buscar-geriatrico">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Buscar geriátrico
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
