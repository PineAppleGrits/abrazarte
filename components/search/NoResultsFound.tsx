"use client";

import { Button } from "@/components/ui/button";
import { SearchX, RefreshCw, MapPin } from "lucide-react";
import Link from "next/link";
import type { Place } from "@/types/common";

interface NoResultsFoundProps {
  searchQuery: string;
  locations: Place[];
  resetFilters: () => void;
}

export function NoResultsFound({ searchQuery, locations, resetFilters }: NoResultsFoundProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-brand-3/30 rounded-full flex items-center justify-center">
          <SearchX className="h-12 w-12 text-brand" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">No encontramos resultados</h2>

      <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        <p className="mb-4">No hemos encontrado residencias geriátricas que coincidan con tu búsqueda.</p>

        {searchQuery && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg inline-block">
            <p className="font-medium">Término de búsqueda: &quot;{searchQuery}&quot;</p>
          </div>
        )}

        {locations && locations.length > 0 && (
          <div className="mb-4">
            <p className="mb-2">Ubicaciones seleccionadas:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {locations.map((location, index) => (
                <span key={index} className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4" />
                  {location.city}, {location.province}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="font-medium mb-2">Sugerencias:</p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto">
            <li className="mb-2">Revisa si hay errores de escritura en tu búsqueda</li>
            <li className="mb-2">Prueba con términos más generales</li>
            <li className="mb-2">Amplía tu búsqueda a otras ubicaciones</li>
            <li className="mb-2">Reduce los filtros aplicados</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={resetFilters} size="lg" className="text-lg">
          <RefreshCw className="mr-2 h-5 w-5" />
          Restablecer filtros
        </Button>

        <Link href="/contacto">
          <Button variant="outline" size="lg" className="text-lg">
            Contactar con un asesor
          </Button>
        </Link>
      </div>
    </div>
  );
}
