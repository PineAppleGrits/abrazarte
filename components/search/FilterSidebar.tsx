import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SearchFilters } from "@/types/common";

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
          <h3 className="text-sm font-medium mb-2">HABITACIÓN:</h3>
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
                Privada
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

        {/* BAÑO */}
        <div>
          <h3 className="text-sm font-medium mb-2">BAÑO:</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="bano-privado"
                checked={filters.bathType.private}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    bathType: {
                      ...filters.bathType,
                      private: checked === true,
                      indifferent: false,
                    },
                  })
                }
              />
              <Label htmlFor="bano-privado" className="ml-2 text-sm font-normal">
                Privado
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="bano-compartido"
                checked={filters.bathType.shared}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    bathType: {
                      ...filters.bathType,
                      shared: checked === true,
                      indifferent: false,
                    },
                  })
                }
              />
              <Label htmlFor="bano-compartido" className="ml-2 text-sm font-normal">
                Compartido
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="indistinto-bano"
                checked={filters.bathType.indifferent}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    bathType: {
                      private: false,
                      shared: false,
                      indifferent: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="indistinto-bano" className="ml-2 text-sm font-normal">
                Indistinto
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
                id="atencion-basica"
                checked={filters.medicalCare.basic}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medicalCare: {
                      ...filters.medicalCare,
                      basic: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="atencion-basica" className="ml-2 text-sm font-normal">
                Atención básica
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="cuidados-especializados"
                checked={filters.medicalCare.specialized}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medicalCare: {
                      ...filters.medicalCare,
                      specialized: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="cuidados-especializados" className="ml-2 text-sm font-normal">
                Cuidados especializados
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="alzheimer"
                checked={filters.medicalCare.alzheimer}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medicalCare: {
                      ...filters.medicalCare,
                      alzheimer: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="alzheimer" className="ml-2 text-sm font-normal">
                Alzheimer
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="movilidad-reducida"
                checked={filters.medicalCare.reducedMobility}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medicalCare: {
                      ...filters.medicalCare,
                      reducedMobility: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="movilidad-reducida" className="ml-2 text-sm font-normal">
                Movilidad reducida
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="personal-medico"
                checked={filters.medicalCare.medical24h}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    medicalCare: {
                      ...filters.medicalCare,
                      medical24h: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="personal-medico" className="ml-2 text-sm font-normal">
                Personal médico 24/7
              </Label>
            </div>
          </div>
        </div>

        {/* TERAPIAS/ACTIVIDADES */}
        <div>
          <h3 className="text-sm font-medium mb-2">TERAPIAS/ACTIVIDADES:</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox
                id="kinesiologia"
                checked={filters.therapies.kinesiology}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    therapies: {
                      ...filters.therapies,
                      kinesiology: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="kinesiologia" className="ml-2 text-sm font-normal">
                Kinesiología/fisioterapia
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="terapia-ocupacional"
                checked={filters.therapies.occupational}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    therapies: {
                      ...filters.therapies,
                      occupational: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="terapia-ocupacional" className="ml-2 text-sm font-normal">
                Terapia ocupacional
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="atencion-psicologica"
                checked={filters.therapies.psychological}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    therapies: {
                      ...filters.therapies,
                      psychological: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="atencion-psicologica" className="ml-2 text-sm font-normal">
                Atención psicológica
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox
                id="nutricionista"
                checked={filters.therapies.nutritionist}
                onCheckedChange={(checked) =>
                  setFilters({
                    ...filters,
                    therapies: {
                      ...filters.therapies,
                      nutritionist: checked === true,
                    },
                  })
                }
              />
              <Label htmlFor="nutricionista" className="ml-2 text-sm font-normal">
                Nutricionista
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
              max={500000}
              step={5000}
              value={[tempPriceRange.min, tempPriceRange.max]}
              onValueChange={(value) =>
                setTempPriceRange({
                  min: value[0],
                  max: value[1],
                })
              }
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
            <Button
              className="w-full"
              onClick={() => {
                setFilters({
                  ...filters,
                  priceRange: tempPriceRange,
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
