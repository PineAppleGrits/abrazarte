import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeSearchBox } from "@/components/HomeSearchBox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Heart, Phone, Shield, Star, Search, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-brand-2/70 z-10" />
        <Image src="/placeholder.svg?height=600&width=1200" alt="Elderly care" fill className="object-cover" priority />

        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Encuentra el mejor cuidado para tus seres queridos
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Te ayudamos a encontrar la residencia geriátrica ideal que se adapte a las necesidades específicas de tu familiar.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Search Box Section */}
      <div className="bg-white py-8 shadow-md relative z-30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto -mt-20 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Busca la residencia ideal</h2>
            <HomeSearchBox />
          </div>
        </div>
      </div>
      {/* How it Works Section */}
      <section className="py-16 bg-gradient-to-b from-white to-brand-3/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-4">¿Cómo funciona Abrazarte?</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Encontrar el lugar perfecto para tu ser querido es sencillo con nuestro proceso de 3 pasos
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-brand" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Busca</h3>
              <p className="text-lg text-gray-600">
                Utiliza nuestros filtros para encontrar el geriátrico ideal según las necesidades específicas de tu familiar.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mb-6">
                <Star className="w-10 h-10 text-brand" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Compara</h3>
              <p className="text-lg text-gray-600">
                Revisa opiniones, servicios, precios y fotos para tomar la mejor decisión con toda la información.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-10 h-10 text-brand" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Contacta</h3>
              <p className="text-lg text-gray-600">
                Comunícate directamente con las residencias que más te interesen y agenda una visita presencial.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">¿Por qué elegir Abrazarte?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-brand/20 p-2 rounded-full">
                    <Check className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Búsqueda personalizada</h3>
                    <p className="text-gray-600 text-lg">
                      Filtra por ubicación, servicios médicos, tipo de habitación y más para encontrar la opción perfecta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-brand/20 p-2 rounded-full">
                    <Shield className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Residencias verificadas</h3>
                    <p className="text-gray-600 text-lg">
                      Todas las residencias en nuestra plataforma han sido verificadas para garantizar su calidad y seguridad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-brand/20 p-2 rounded-full">
                    <Heart className="h-6 w-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Asesoramiento gratuito</h3>
                    <p className="text-gray-600 text-lg">
                      Nuestro equipo de expertos está disponible para ayudarte en cada paso del proceso sin costo adicional.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=500&width=600&text=Cuidado+de+calidad"
                alt="Cuidado de calidad"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-brand-3/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Familias Felices</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-5xl text-brand mb-4">&quot;</div>
              <p className="text-gray-700 text-lg italic mb-6">
                Con Abrazarte fue fácil comparar opciones y hablar con las residencias. Encontramos el lugar perfecto para mi
                papá, ¡un alivio total!
              </p>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="flex items-center mt-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Laura R."
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Laura R.</p>
                  <p className="text-sm text-gray-600">Belgrano, CABA</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-5xl text-brand mb-4">&quot;</div>
              <p className="text-gray-700 text-lg italic mb-6">
                No sabíamos por dónde empezar para elegir una residencia. Abrazarte lo hizo simple, con asesoramiento en cada
                paso. ¡Lo recomiendo!
              </p>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="flex items-center mt-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Martín S."
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold">Martín S.</p>
                  <p className="text-sm text-gray-600">Caballito, CABA</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-5xl text-brand mb-4">&quot;</div>
              <p className="text-gray-700 text-lg italic mb-6">
                Pude ver opiniones y contactar directamente a las residencias. Ahora mi mamá está en un lugar increíble, ¡muy
                buena experiencia!
              </p>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="flex items-center mt-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Ana P." width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <p className="font-bold">Ana P.</p>
                  <p className="text-sm text-gray-600">Pilar, GBA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonios">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                Ver más testimonios
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Respuestas a las dudas más comunes sobre el cuidado de adultos mayores y residencias geriátricas
          </p>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-xl shadow-sm border border-gray-100">
                <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline">
                  ¿Cuándo es el momento adecuado para considerar una residencia geriátrica?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-lg">
                  El momento adecuado varía según cada situación, pero algunos indicadores incluyen: dificultades para realizar
                  actividades básicas diarias, problemas de salud que requieren atención constante, aislamiento social, riesgos de
                  seguridad en el hogar o cuando el cuidador familiar experimenta agotamiento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-xl shadow-sm border border-gray-100">
                <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline">
                  ¿Qué diferencia hay entre un centro de día y una residencia permanente?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-lg">
                  Un centro de día ofrece atención durante el horario diurno, permitiendo que el adulto mayor regrese a su hogar
                  por la noche. Es ideal para quienes necesitan supervisión o actividades durante el día pero pueden dormir en
                  casa. Una residencia permanente proporciona alojamiento y cuidados las 24 horas, siendo apropiada cuando se
                  requiere atención constante o cuando vivir solo ya no es seguro o práctico.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-xl shadow-sm border border-gray-100">
                <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline">
                  ¿Cómo puedo saber si una residencia geriátrica es de buena calidad?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-lg">
                  Una residencia de calidad debe tener: personal capacitado y suficiente, instalaciones limpias y seguras,
                  atención médica adecuada, actividades sociales y recreativas, buena alimentación, y un ambiente cálido y
                  respetuoso. Es recomendable visitar personalmente, hablar con residentes actuales y sus familiares, y verificar
                  las habilitaciones correspondientes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-xl shadow-sm border border-gray-100">
                <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline">
                  ¿Qué documentación necesito para el ingreso a una residencia?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-lg">
                  Generalmente se requiere: documento de identidad del adulto mayor, historia clínica completa, estudios médicos
                  recientes, lista de medicamentos actuales, información de obra social o seguro médico, datos de contacto de
                  familiares, y documentación legal si existe un apoderado o tutor. Cada residencia puede tener requisitos
                  adicionales específicos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-xl shadow-sm border border-gray-100">
                <AccordionTrigger className="text-xl font-medium px-6 py-4 hover:no-underline">
                  ¿Cómo ayudar a mi familiar a adaptarse a la vida en una residencia?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-lg">
                  Para facilitar la adaptación: visite regularmente, personalice su habitación con objetos familiares, mantenga
                  comunicación frecuente, participe en actividades de la residencia, establezca una buena relación con el
                  personal, respete su proceso de adaptación que puede tomar tiempo, y busque apoyo profesional si la transición
                  resulta especialmente difícil.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <Link href="/contacto">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                ¿Tienes más preguntas? Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-brand">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para encontrar la residencia ideal?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Únete a cientos de familias que han encontrado el lugar perfecto para sus seres queridos con Abrazarte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buscar-geriatrico">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto w-full sm:w-auto">
                <HomeIcon className="mr-2 h-5 w-5" />
                Buscar geriátrico
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="default" size="lg" className="text-lg px-8 py-6 h-auto w-full sm:w-auto border-white  border-2">
                <Phone className="mr-2 h-5 w-5" />
                Hablar con un asesor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
