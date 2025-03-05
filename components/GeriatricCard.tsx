import { GeriatricSearchResult } from "@/types/common";
import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface GeriatricCardProps {
  geriatric: GeriatricSearchResult;
  handleAddToFavorites: (id: string) => void;
  favoritesMutation: { isPending: boolean };
}

export default function GeriatricCard({ geriatric, handleAddToFavorites, favoritesMutation }: GeriatricCardProps) {

  const starRating = Math.round((geriatric.rating / 10) * 5);

  const ratingLabel =
    geriatric.rating >= 8 ? "Fabuloso" : geriatric.rating >= 7 ? "Muy bueno" : geriatric.rating >= 6 ? "Bueno" : "Regular";

  const mainImageSrc = geriatric.mainImage || "/placeholder.svg?height=200&width=300";

  const images = geriatric.images.slice(0, 4);
  const mainImage = images.shift()! || mainImageSrc;
  return (
    <div key={geriatric.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Main image and additional images */}
        <div className="md:col-span-1 space-y-4">
          {/* Main Image */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={mainImage}
              alt={geriatric.name}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/placeholder.svg?blur=10"
            />
          </div>

          {/* Additional Images (if available) */}
          {images && images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, i) => (
                <div key={`${geriatric.id}-image-${i}`} className="relative w-full h-16 rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`${geriatric.name} image`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.svg?blur=10"
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
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{geriatric.name}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, index) =>
                      index < starRating ? (
                        <Star key={index} className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <Star key={index} className="w-5 h-5 text-gray-300" />
                      )
                    )}
                  </div>
                </div>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  Ubicación: {geriatric.city}, {geriatric.province}
                </p>
              </div>

              {/* Rating Badge */}
              <div className="bg-gray-100 px-4 py-2 rounded-lg text-center">
                <p className="text-lg font-bold">{ratingLabel}</p>
                <p className="text-2xl font-bold bg-primary text-white rounded-full px-3 py-1">{geriatric.rating.toFixed(1)}</p>
                <p className="text-sm text-gray-600">{geriatric.reviewCount} comentarios</p>
              </div>
            </div>

            {/* Description Details */}
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-medium">Tipo de Estadía:</span>{" "}
                {geriatric.hasDayCare && geriatric.hasPermanentStay
                  ? "Centro de Día o Internación Permanente"
                  : geriatric.hasDayCare
                  ? "Centro de Día"
                  : "Internación Permanente"}
              </p>
              <p>
                <span className="font-medium">
                  {geriatric.hasPrivateRoom && geriatric.hasPrivateBath
                    ? "Habitación y baño privado disponible"
                    : geriatric.hasPrivateRoom
                    ? "Habitación privada disponible"
                    : "Solo habitaciones compartidas"}
                </span>
              </p>
              <p>
                <span className="font-medium">Principales Servicios:</span>{" "}
                {geriatric.therapies.includes("kinesiology") ? "Terapia física, " : ""}
                {geriatric.therapies.includes("occupational") ? "terapia ocupacional, " : ""}
                actividades recreativas
              </p>
              <p>
                <span className="font-medium">Personal Médico:</span>{" "}
                {geriatric.has24hMedical ? "Atención 24 hs" : "Atención programada"}
              </p>
            </div>
          </div>

          {/* Footer with Price and Action Buttons */}
          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-gray-600 text-sm">Precio Estimado:</p>
              <p className="text-lg font-bold">
                ${geriatric.priceRangeMin?.toLocaleString()} - ${geriatric.priceRangeMax?.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleAddToFavorites(geriatric.id)}
                disabled={favoritesMutation.isPending}
              >
                <Heart className="h-4 w-4" />
                <span>Guardar en favoritos</span>
              </Button>
              <Link href={`/geriatrics/${geriatric.id}`}>
                <Button size="sm">Ver más</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
