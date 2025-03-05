import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react";

export default function Contacto() {
  return (
    <>
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
            <p className="text-lg text-gray-700">
              Estamos aquí para ayudarte a encontrar la mejor opción de cuidado para tu ser querido. No dudes en contactarnos con
              cualquier pregunta o inquietud.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" placeholder="Tu apellido" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+54 9 11 XXXX XXXX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input id="asunto" placeholder="¿Sobre qué nos quieres contactar?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." className="min-h-[150px]" required />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Enviar mensaje
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>

              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Teléfono</h3>
                      <p className="text-gray-600">+54 11 5555 5555</p>
                      <p className="text-gray-600">+54 11 6666 6666</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-gray-600">info@findcare.com</p>
                      <p className="text-gray-600">soporte@findcare.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Dirección</h3>
                      <p className="text-gray-600">Av. Corrientes 1234, Piso 5</p>
                      <p className="text-gray-600">Ciudad Autónoma de Buenos Aires</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Horario de atención</h3>
                      <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                      <p className="text-gray-600">Sábados: 10:00 - 14:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Síguenos en redes sociales</h3>
              <div className="flex gap-4 mb-8">
                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Facebook className="w-6 h-6 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Twitter className="w-6 h-6 text-primary" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Preguntas frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">¿Cómo funciona Find Care?</h3>
                <p className="text-gray-600">
                  Find Care te permite buscar, comparar y contactar residencias geriátricas según tus necesidades específicas.
                  Utilizamos filtros personalizados para ayudarte a encontrar la mejor opción.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">¿El servicio tiene algún costo?</h3>
                <p className="text-gray-600">
                  No, nuestro servicio es completamente gratuito para las familias que buscan residencias geriátricas. Nos
                  financiamos a través de nuestras alianzas con las instituciones.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">¿Cómo verifican la calidad de las residencias?</h3>
                <p className="text-gray-600">
                  Realizamos visitas presenciales, verificamos habilitaciones y recopilamos opiniones de familias que han
                  utilizado los servicios para garantizar la calidad de cada institución.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-2">¿Ofrecen asesoramiento personalizado?</h3>
                <p className="text-gray-600">
                  Sí, contamos con un equipo de especialistas que pueden brindarte asesoramiento personalizado según las
                  necesidades específicas de tu ser querido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
