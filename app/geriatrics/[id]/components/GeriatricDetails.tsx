"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Clock, Star, Heart, Check, X, Info, Calendar, Bed, Bath, HeartPulse, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reviews } from "./Reviews";
import { Map } from "./Map";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Geriatric, GeriatricTherapy, Review } from "@prisma/client";

interface GeriatricDetailsProps {
  geriatric: Geriatric & {
    therapies: GeriatricTherapy[];
    reviews: Review[];
  };
  initialIsFavorite?: boolean;
}

interface FeatureItemProps {
  isAvailable: boolean;
  label: string;
  description?: string;
}

const FeatureItem = ({ isAvailable, label, description }: FeatureItemProps) => (
  <div className="flex items-center gap-2">
    {isAvailable ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
    <span className="text-gray-700">{label}</span>
    {description && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>{description}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
);

export function GeriatricDetails({ geriatric, initialIsFavorite = false }: GeriatricDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(initialIsFavorite);
  }, [initialIsFavorite]);

  const toggleFavorite = async () => {
    try {
      setIsLoading(true);


      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const therapyLabels: Record<string, string> = {
    KINESIOLOGY: "Kinesiología",
    OCCUPATIONAL: "Terapia Ocupacional",
    PSYCHOLOGICAL: "Psicología",
    NUTRITIONIST: "Nutrición",
  };

  function formatCurrency(price: number | null): React.ReactNode {
    return (
      price &&
      price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      })
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Image Section */}
        <div className="w-full lg:w-2/3">
          {geriatric.mainImage ? (
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image src={geriatric.mainImage} alt={geriatric.name} fill className="object-cover" priority />
            </div>
          ) : (
            <div className="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Quick Info Card */}
        <div className="w-full lg:w-1/3">
          <Card className="p-6 shadow-lg">
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
            <div className="flex items-center mt-3 text-yellow-500">
              <Star className="fill-current" size={20} />
              <span className="ml-1 font-medium">{geriatric.rating.toFixed(1)}</span>
              <span className="ml-2 text-gray-500">({geriatric.reviewCount} reseñas)</span>
            </div>

            {/* Location and Hours */}
            <div className="mt-6 space-y-3 text-gray-700">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">
                  {`${geriatric.street} ${geriatric.streetNumber}, ${geriatric.city}, ${geriatric.province}`}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span className="text-sm">Atención 24/7</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Rango de Precios</h3>
              <div className="text-lg font-semibold text-gray-900">
                {formatCurrency(geriatric.priceRangeMin)} - {formatCurrency(geriatric.priceRangeMax)}
                <span className="text-sm text-gray-500 ml-1">/mes</span>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="mt-6 space-y-3">
              <Button className="w-full" size="lg">
                <span>Contactar</span>
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Agendar Visita
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-6">
        {/* Información General */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Información General</h2>
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
                <FeatureItem isAvailable={geriatric.hasBasicCare} label="Cuidados Básicos" />
                <FeatureItem isAvailable={geriatric.hasSpecializedCare} label="Cuidados Especializados" />
                <FeatureItem isAvailable={geriatric.hasAlzheimerCare} label="Cuidados Alzheimer" />
              </div>
            </div>
          </div>
        </Card>

        {/* Servicios Disponibles */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Servicios Disponibles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Terapias
              </h3>
              <div className="space-y-3">
                {Object.entries(therapyLabels).map(([therapyKey, label]) => (
                  <FeatureItem
                    key={therapyKey}
                    isAvailable={geriatric.therapies.some((t) => t.therapy === therapyKey)}
                    label={label}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Servicios Adicionales
              </h3>
              <div className="space-y-3">
                <FeatureItem
                  isAvailable={geriatric.hasReducedMobility}
                  label="Accesibilidad Reducida"
                  description="Instalaciones adaptadas para movilidad reducida"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Instalaciones */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Instalaciones</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Bed className="w-5 h-5" />
                Habitaciones
              </h3>
              <div className="space-y-3">
                <FeatureItem isAvailable={geriatric.hasPrivateRoom} label="Habitaciones Privadas" />
                <FeatureItem isAvailable={geriatric.hasSharedRoom} label="Habitaciones Compartidas" />
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Bath className="w-5 h-5" />
                Baños
              </h3>
              <div className="space-y-3">
                <FeatureItem isAvailable={geriatric.hasPrivateBath} label="Baños Privados" />
                <FeatureItem isAvailable={geriatric.hasSharedBath} label="Baños Compartidos" />
              </div>
            </div>
          </div>
        </Card>

        {/* Ubicación */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Ubicación</h2>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <Map
              latitude={geriatric.latitude}
              longitude={geriatric.longitude}
              name={geriatric.name}
              address={`${geriatric.street} ${geriatric.streetNumber}, ${geriatric.city}, ${geriatric.province}`}
            />
          </div>
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
        </Card>

        {/* Reviews */}
        <Reviews reviews={geriatric.reviews} />
      </div>
    </div>
  );
}
