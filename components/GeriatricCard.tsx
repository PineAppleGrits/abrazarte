"use client";

import { useState } from "react";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StarRating } from "./StarRating";

interface GeriatricSearchResult {
  id: string;
  name: string;
  description: string;
  images: string[];
  mainImage?: string;
  rating: number;
  reviewCount: number;
  priceRangeMin?: number;
  priceRangeMax?: number;
  hasDayCare: boolean;
  hasPermanentStay: boolean;
  hasPrivateRoom: boolean;
  hasSharedRoom: boolean;
  hasIndependentCare: boolean;
  hasSemiDependent: boolean;
  hasDependent: boolean;
  hasHighComplexity: boolean;
  has24hMedical: boolean;
  has24hNursing: boolean;
  hasPresentialDoctor: boolean;
  hasKinesiology: boolean;
  hasMedicationSupply: boolean;
  hasAttentionForNeurologicalDiseases: boolean;
  city: string;
  province: string;
}

interface GeriatricCardProps {
  geriatric: GeriatricSearchResult;
  initialIsFavorite: boolean;
}

export default function GeriatricCard({ geriatric, initialIsFavorite = false }: GeriatricCardProps) {
  const queryClient = useQueryClient();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const rating = Math.min(Math.round(geriatric.rating) / 2, 5);

  // Handle images
  const mainImageSrc = geriatric.mainImage || "/placeholder.svg?height=200&width=300";
  const additionalImages = geriatric.images.slice(0, 3);

  // Group care types for better organization
  const careTypes = [
    { label: "Independiente", value: geriatric.hasIndependentCare },
    { label: "Semi-dependiente", value: geriatric.hasSemiDependent },
    { label: "Dependiente", value: geriatric.hasDependent },
    { label: "Alta complejidad", value: geriatric.hasHighComplexity },
  ].filter((type) => type.value);

  // Group medical services for better organization
  const medicalServices = [
    { label: "Atención médica 24hs", value: geriatric.has24hMedical },
    { label: "Enfermería 24hs", value: geriatric.has24hNursing },
    { label: "Médico presencial", value: geriatric.hasPresentialDoctor },
    { label: "Kinesiología", value: geriatric.hasKinesiology },
    { label: "Suministro de medicamentos", value: geriatric.hasMedicationSupply },
    { label: "Atención para enfermedades neurológicas", value: geriatric.hasAttentionForNeurologicalDiseases },
  ].filter((service) => service.value);

  console.log({ medicalServices });

  // Prepare a shortened description for preview
  const shortDescription =
    geriatric.description.length > 150 ? `${geriatric.description.substring(0, 150)}...` : geriatric.description;

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        const res = await fetch(`/api/favorite?geriatricId=${geriatric.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove from favorites");
        return res.json();
      } else {
        const res = await fetch(`/api/favorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ geriatricId: geriatric.id }),
        });
        if (!res.ok) throw new Error("Failed to add to favorites");
        return res.json();
      }
    },
    onSuccess: () => {
      setIsFavorite((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  function toggleFavorite() {
    favoriteMutation.mutate();
  }

  function toggleDescription() {
    setShowFullDescription(!showFullDescription);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column: Main image and additional images */}
        <div className="md:col-span-1 space-y-3">
          {/* Main Image */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={mainImageSrc || "/placeholder.svg"}
              alt={geriatric.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Additional Images */}
          {additionalImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {additionalImages.map((img, i) => (
                <div key={`${geriatric.id}-image-${i}`} className="relative w-full h-16 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${geriatric.name} imagen ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 10vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Content */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-xl font-bold line-clamp-1">{geriatric.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <StarRating rating={rating} />
                  </div>
                  <p className="text-sm text-gray-600">
                    {geriatric.reviewCount > 0
                      ? `(${geriatric.reviewCount} ${geriatric.reviewCount === 1 ? "reseña" : "reseñas"})`
                      : "(Sin reseñas)"}
                  </p>
                </div>
                <p className="text-gray-600 flex items-center gap-1">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {geriatric.city}, {geriatric.province}
                  </span>
                </p>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={toggleFavorite}
                      disabled={favoriteMutation.isPending}
                      aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
                    >
                      <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-500")} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Description Section */}
            <div className="mt-3 bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-700">{showFullDescription ? geriatric.description : shortDescription}</p>
              {geriatric.description.length > 150 && (
                <Button variant="link" size="sm" className="p-0 h-auto text-primary mt-1" onClick={toggleDescription}>
                  {showFullDescription ? "Ver menos" : "Ver más"}
                </Button>
              )}
            </div>

            {/* Tipo de Estadía */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {geriatric.hasDayCare && (
                  <Badge variant="outline" className="bg-brand-3/10">
                    Centro de Día
                  </Badge>
                )}
                {geriatric.hasPermanentStay && (
                  <Badge variant="outline" className="bg-brand-3/10">
                    Internación Permanente
                  </Badge>
                )}
                {geriatric.hasPrivateRoom && (
                  <Badge variant="outline" className="bg-green-50">
                    Habitación Privada
                  </Badge>
                )}
                {geriatric.hasSharedRoom && (
                  <Badge variant="outline" className="bg-green-50">
                    Habitación Compartida
                  </Badge>
                )}
              </div>

              {/* Grado de Atención */}
              {careTypes.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Grado de atención:</p>
                  <div className="flex flex-wrap gap-2">
                    {careTypes.map((type, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-50">
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Servicios Destacados - Mostrar solo algunos en la vista principal */}
              {medicalServices.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Servicios destacados:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                    {medicalServices.slice(0, 4).map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-gray-700">{service.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mostrar más servicios en un acordeón si hay más de 4 */}
                  {medicalServices.length > 4 && (
                    <Accordion type="single" collapsible className="mt-1">
                      <AccordionItem value="more-services" className="border-none">
                        <AccordionTrigger className="py-1 text-sm text-primary hover:no-underline">
                          Ver más servicios
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm pt-1">
                            {medicalServices.slice(4).map((service, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-gray-700">{service.label}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer with Price and Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {geriatric.priceRangeMin || geriatric.priceRangeMax ? (
              <div>
                <p className="text-gray-600 text-sm">Precio Estimado:</p>
                <p className="text-lg font-bold">
                  {geriatric.priceRangeMin && geriatric.priceRangeMax
                    ? `$${geriatric.priceRangeMin.toLocaleString()} - $${geriatric.priceRangeMax.toLocaleString()}`
                    : geriatric.priceRangeMin
                    ? `Desde $${geriatric.priceRangeMin.toLocaleString()}`
                    : `Hasta $${geriatric.priceRangeMax?.toLocaleString()}`}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 text-sm">Precio a consultar</p>
              </div>
            )}

            <Link href={`/geriatrics/${geriatric.id}`} className="w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto">
                Ver detalles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
