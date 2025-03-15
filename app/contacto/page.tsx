"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Contacto() {
  const router = useRouter();
  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-7xl font-bold mb-6">Contactate con nuestro equipo de profesionales</h2>
              <h4 className="text-xl mb-6">
                ¿Necesitás ayuda para encontrar la mejor opción o tenés alguna duda? Escribinos y te responderemos a la brevedad
              </h4>

              <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">+54 9 11 1598 5566</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">contacto@abrazarte.com</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push("/gracias");
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Tu nombre" required />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" placeholder="+54 9 11 XXXX XXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Select defaultValue="family">
                    <SelectTrigger className="w-[280px]">
                      <SelectValue defaultValue={"family"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family" defaultChecked>
                        Familia
                      </SelectItem>
                      <SelectItem value="geriatric">Geriatrico</SelectItem>
                      <SelectItem value="business">Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Consulta</Label>
                  <Textarea id="mensaje" placeholder="Escribe tu consulta aquí..." className="min-h-[150px]" required />
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Enviar mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
