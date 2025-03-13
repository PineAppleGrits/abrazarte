"use client";

import type React from "react";

import { useState } from "react";
import { MapPin, Clock, Heart, Info, Calendar, Bed, HeartPulse, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reviews } from "./Reviews";
import { Map } from "./Map";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StarRating } from "@/components/StarRating";
import { GeriatricGallery } from "@/components/geriatric-gallery";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Geriatric, Image as ImageType, Review } from "@prisma/client";
import { FeatureBadge } from "./feature-badge";

interface GeriatricDetailsPageProps {
  geriatric: Geriatric & {
    reviews: Review[];
    images: ImageType[];
  };
  initialIsFavorite?: boolean;
}

interface FeatureItemProps {
  isAvailable: boolean | null;
  label: string;
  description?: string;
}

const FeatureItem = ({ isAvailable, label, description }: FeatureItemProps) => {
  if (isAvailable === null) return;
  return (
    <div className="flex items-center gap-2">
      {isAvailable ? (
        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-green-600"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3 text-red-600"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      )}
      <span className="text-gray-700">{label}</span>
      {description && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">{description}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export function GeriatricDetailsPage({ geriatric, initialIsFavorite = false }: GeriatricDetailsPageProps) {
  const queryClient = useQueryClient();
  const [isLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  function formatCurrency(price: number | null): React.ReactNode {
    return price != null
      ? price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })
      : null;
  }

  const favoriteMutation = useMutation({
    mutationFn: async (currentIsFavorite: boolean) => {
      if (currentIsFavorite) {
        const res = await fetch(`/api/favorite?geriatricId=${geriatric.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to remove from favorites");
        return res.json();
      } else {
        const { data } = await axios.post(`/api/favorite`, {
          geriatricId: geriatric.id,
        });
        return data;
      }
    },
    onSuccess: () => {
      setIsFavorite((prevFav) => !prevFav);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  function toggleFavorite() {
    favoriteMutation.mutate(isFavorite);
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="w-full lg:w-2/3">
          <GeriatricGallery images={geriatric.images} name={geriatric.name} />
        </div>

        {/* Quick Info Card */}
        <div className="w-full lg:w-1/3">
          <Card className="p-6 shadow-lg border-t-4 border-brand">
            {/* Header with Name and Favorite */}
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{geriatric.name}</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFavorite}
                      disabled={isLoading}
                      className={`transition-colors ${
                        isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <Heart className={`transition-all ${isFavorite ? "fill-red-500" : "fill-transparent"}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isFavorite ? "Remover de favoritos" : "Agregar a favoritos"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Rating */}
            <div className="flex items-center mt-3">
              <StarRating rating={geriatric.rating / 2} />
              <span className="ml-1 font-medium">{geriatric.rating.toFixed(1)}</span>
              <span className="ml-2 text-gray-500">({geriatric.reviewCount} reseñas)</span>
            </div>

            {/* Location and Hours */}
            {geriatric.address && (
              <div className="mt-6 space-y-3 text-gray-700">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{geriatric.address}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <span className="text-sm">Atención 24/7</span>
                </div>
              </div>
            )}

            {/* Feature Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {geriatric.hasDayCare && <FeatureBadge label="Centro de Día" />}
              {geriatric.hasPermanentStay && <FeatureBadge label="Estadía Permanente" />}
              {geriatric.has24hMedical && <FeatureBadge label="Médico 24h" />}
              {geriatric.has24hNursing && <FeatureBadge label="Enfermería 24h" />}
            </div>

            {/* Price Range */}
            {geriatric.priceRangeMin != null && geriatric.priceRangeMax != null && (
              <div className="mt-6 p-4 bg-brand/20 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Rango de Precios</h3>
                <div className="text-lg font-semibold text-gray-900">
                  {formatCurrency(geriatric.priceRangeMin)} - {formatCurrency(geriatric.priceRangeMax)}
                  <span className="text-sm text-gray-500 ml-1">/mes</span>
                </div>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="mt-6 space-y-3">
              <Button className="w-full bg-brand hover:bg-brand/80" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                <span>Contactar</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Información General</h2>
          <p className="text-gray-700 mb-6">{geriatric.description}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Tipos de Estadía
              </h3>
              <div className="space-y-3">
                <FeatureItem
                  isAvailable={geriatric.hasDayCare}
                  label="Centro de Día"
                  description="Cuidados durante el día sin alojamiento"
                />
                <FeatureItem
                  isAvailable={geriatric.hasPermanentStay}
                  label="Estadía Permanente"
                  description="Alojamiento y cuidados las 24 horas"
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <HeartPulse className="w-5 h-5" />
                Atención Médica
              </h3>
              <div className="space-y-3">
                <FeatureItem
                  isAvailable={geriatric.has24hMedical}
                  label="Atención Médica 24/7"
                  description="Disponibilidad médica constante"
                />
                <FeatureItem
                  isAvailable={geriatric.has24hNursing}
                  label="Enfermería 24/7"
                  description="Atención de enfermería permanente"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Características Detalladas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <HeartPulse className="w-5 h-5" />
                Servicios Médicos
              </h3>
              <div className="space-y-3">
                <FeatureItem
                  isAvailable={geriatric.has24hMedical}
                  label="Atención Médica 24/7"
                  description="Disponibilidad médica constante"
                />
                <FeatureItem
                  isAvailable={geriatric.has24hNursing}
                  label="Enfermería 24/7"
                  description="Atención de enfermería permanente"
                />
                <FeatureItem
                  isAvailable={geriatric.hasPresentialDoctor}
                  label="Médico Presencial"
                  description="Médico presente en el establecimiento"
                />
                <FeatureItem
                  isAvailable={geriatric.hasKinesiology}
                  label="Kinesiología"
                  description="Servicios de rehabilitación física"
                />
                <FeatureItem
                  isAvailable={geriatric.hasMedicationSupply}
                  label="Suministro de Medicamentos"
                  description="Administración y control de medicamentos"
                />
                <FeatureItem
                  isAvailable={geriatric.hasAttentionForNeurologicalDiseases}
                  label="Atención para Enfermedades Neurológicas"
                  description="Cuidados especializados para condiciones como Alzheimer, Parkinson, etc."
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Grado de Dependencia Atendido
              </h3>
              <div className="space-y-3">
                <FeatureItem
                  isAvailable={geriatric.hasIndependentCare}
                  label="Independientes"
                  description="Personas que pueden realizar actividades básicas por sí mismas"
                />
                <FeatureItem
                  isAvailable={geriatric.hasSemiDependent}
                  label="Semi-dependientes"
                  description="Personas que requieren asistencia parcial para algunas actividades"
                />
                <FeatureItem
                  isAvailable={geriatric.hasDependent}
                  label="Dependientes"
                  description="Personas que requieren asistencia para la mayoría de actividades diarias"
                />
                <FeatureItem
                  isAvailable={geriatric.hasHighComplexity}
                  label="Alta Complejidad"
                  description="Personas que requieren cuidados médicos intensivos y constantes"
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Bed className="w-5 h-5" />
                Habitaciones
              </h3>
              <div className="space-y-3">
                <FeatureItem
                  isAvailable={geriatric.hasPrivateRoom}
                  label="Habitaciones Privadas"
                  description="Habitaciones individuales para mayor privacidad"
                />
                <FeatureItem
                  isAvailable={geriatric.hasSharedRoom}
                  label="Habitaciones Compartidas"
                  description="Habitaciones para dos o más residentes"
                />
              </div>
            </div>
          </div>
        </Card>

        {(geriatric.latitude != null && geriatric.longitude != null) ||
        (geriatric.street && geriatric.streetNumber && geriatric.city && geriatric.province && geriatric.country) ? (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Ubicación</h2>
            {geriatric.latitude != null && geriatric.longitude != null && (
              <div className="h-[400px] rounded-lg overflow-hidden mb-6">
                <Map
                  latitude={geriatric.latitude}
                  longitude={geriatric.longitude}
                  name={geriatric.name}
                  address={geriatric.address}
                />
              </div>
            )}
            {geriatric.street && geriatric.streetNumber && geriatric.city && geriatric.province && geriatric.country && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Dirección Completa</h3>
                <p className="text-gray-700">
                  {`${geriatric.street} ${geriatric.streetNumber}`}
                  <br />
                  {`${geriatric.city}, ${geriatric.province}`}
                  <br />
                  {geriatric.country}
                </p>
              </div>
            )}
          </Card>
        ) : null}

        <Reviews reviews={geriatric.reviews} />
      </div>
    </div>
  );
}
