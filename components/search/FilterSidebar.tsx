"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { SearchFilters } from "@/types/common";
import { Star } from "lucide-react";

interface FilterSidebarProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  tempPriceRange: { min: number; max: number };
  setTempPriceRange: (range: { min: number; max: number }) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

export function FilterSidebar({
  filters,
  setFilters,
  tempPriceRange,
  setTempPriceRange,
  resetFilters,
  applyFilters,
}: FilterSidebarProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Restablecer
        </Button>
      </div>

      <div className="space-y-6">
        {/* TIPO DE ESTADÍA */}

        <div>
          <h3 className="text-sm font-medium mb-2">TIPO DE ESTADÍA</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="centro-dia"
                checked={filters.stayType.dayCare}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    stayType: {
                      ...filters.stayType,
                      dayCare: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="centro-dia" className="ml-2 text-sm font-normal">
                Centro de día
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="internacion"
                checked={filters.stayType.permanentStay}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    stayType: {
                      ...filters.stayType,
                      permanentStay: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="internacion" className="ml-2 text-sm font-normal">
                Internación permanente
              </Label>
            </div>
          </div>
        </div>

        {/* HABITACIÓN */}
        <div>
          <h3 className="text-sm font-medium mb-2">HABITACIÓN</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="privada"
                checked={filters.roomType.private}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    roomType: {
                      ...filters.roomType,
                      private: checked === true,
                      indifferent: false,
                    },
                  })
                }
              />
              <Label htmlFor="privada" className="ml-2 text-sm font-normal">
                Individual
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="doble"
                checked={filters.roomType.double}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    roomType: {
                      ...filters.roomType,
                      double: checked === true,
                      indifferent: false,
                    },
                  })
                }
              />
              <Label htmlFor="doble" className="ml-2 text-sm font-normal">
                Doble
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="compartida"
                checked={filters.roomType.shared}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    roomType: {
                      ...filters.roomType,
                      shared: checked === true,
                      indifferent: false,
                    },
                  })
                }
              />
              <Label htmlFor="compartida" className="ml-2 text-sm font-normal">
                Compartida
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="indistinto-hab"
                checked={filters.roomType.indifferent}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    roomType: {
                      private: false,
                      double: false,
                      shared: false,
                      indifferent: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="indistinto-hab" className="ml-2 text-sm font-normal">
                Indistinto
              </Label>
            </div>
          </div>
        </div>

        {/* GRADO DE ASISTENCIA */}
        <div>
          <h3 className="text-sm font-medium mb-2 uppercase">Grado de asistencia</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="independiente"
                checked={filters.dependency.independent}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    dependency: {
                      ...filters.dependency,
                      independent: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="independiente" className="ml-2 text-sm font-normal">
                Independiente
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="semi-dependiente"
                checked={filters.dependency.semiDependent}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    dependency: {
                      ...filters.dependency,
                      semiDependent: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="semi-dependiente" className="ml-2 text-sm font-normal">
                Semi dependiente
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="dependiente"
                checked={filters.dependency.dependent}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    dependency: {
                      ...filters.dependency,
                      dependent: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="dependiente" className="ml-2 text-sm font-normal">
                Dependiente
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="alta-complejidad"
                checked={filters.dependency.highComplexity}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    dependency: {
                      ...filters.dependency,
                      highComplexity: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="alta-complejidad" className="ml-2 text-sm font-normal">
                Alta complejidad
              </Label>
            </div>
          </div>
        </div>

        {/* NIVEL DE ATENCIÓN MÉDICA */}
        <div>
          <h3 className="text-sm font-medium mb-2">NIVEL DE ATENCIÓN MÉDICA</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="enfermeria-247"
                checked={filters.medical.nursing24}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medical: {
                      ...filters.medical,
                      nursing24: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="enfermeria-247" className="ml-2 text-sm font-normal">
                Enfermería 24/7
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="medico-presencial"
                checked={filters.medical.presentialDoctor}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medical: {
                      ...filters.medical,
                      presentialDoctor: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="medico-presencial" className="ml-2 text-sm font-normal">
                Médico presencial
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="enfermedades-neurodegenerativas"
                checked={filters.medical.neurological}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medical: {
                      ...filters.medical,
                      neurological: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="enfermedades-neurodegenerativas" className="ml-2 text-sm font-normal">
                Atención para enfermedades neurodegenerativas
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="medicamentos"
                checked={filters.medical.medication}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medical: {
                      ...filters.medical,
                      medication: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="medicamentos" className="ml-2 text-sm font-normal">
                Suministro y control de medicamentos
              </Label>
            </div>
          </div>
        </div>

        {/* RANGO DE PRECIOS */}
        <div>
          <h3 className="text-sm font-medium mb-4">Rango de precios</h3>
          <div className="space-y-6">
            <Slider
              defaultValue={[tempPriceRange.min, tempPriceRange.max]}
              min={0}
              max={10000000}
              step={5000}
              double
              value={[tempPriceRange.min, tempPriceRange.max]}
              onValueChange={(value) => setTempPriceRange({ min: value[0], max: value[1] })}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Mínimo</span>
                <p className="font-medium">
                  {tempPriceRange.min.toLocaleString("es-AR", {
                    currency: "ARS",
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Máximo</span>
                <p className="font-medium">
                  {tempPriceRange.max.toLocaleString("es-AR", {
                    currency: "ARS",
                  })}
                </p>
              </div>
            </div>
            {/* CALIFICACIÓN MÍNIMA */}
            <div>
              <h3 className="text-sm font-medium mb-4 flex justify-between">
                Calificación mínima
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i * 2;
                    const nextStarValue = starValue + 2;
                    const isFilled = filters.rating >= nextStarValue;
                    const isHalfFilled = !isFilled && filters.rating >= starValue + 1;

                    return (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          isFilled
                            ? "fill-primary text-primary"
                            : isHalfFilled
                            ? "fill-primary text-primary [clip-path:polygon(0_0,50%_0,50%_100%,0_100%)]"
                            : "text-muted-foreground"
                        }`}
                      />
                    );
                  })}
                </div>
              </h3>
              <div className="space-y-6">
                <Slider
                  defaultValue={[filters.rating]}
                  min={0}
                  max={10}
                  step={1}
                  value={[filters.rating]}
                  onValueChange={(value) => setFilters({ ...filters, rating: value[0] })}
                  className="w-full"
                />
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setFilters({
                  ...filters,
                  priceRange: tempPriceRange,
                  rating: filters.rating,
                });
                applyFilters();
              }}
              variant="default"
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
