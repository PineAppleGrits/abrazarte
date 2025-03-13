import { useState } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GooglePlacesAutocomplete, Place } from "../GooglePlacesAutocomplete";
import type { GeriatricFormData } from "./types";
import { Card } from "../ui/card";
import ImageUploader from "../CloudinaryImageUploader";
import TriStateCheckbox from "./TriStateCheckbox";

const geriatricSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  priceRangeMin: z.number({ message: "Ingrese un valor válido" }).min(0, "El precio mínimo debe ser mayor a 0"),
  priceRangeMax: z.number({ message: "Ingrese un valor válido" }).min(0, "El precio máximo debe ser mayor a 0"),
  hasDayCare: z.boolean().nullable(),
  hasPermanentStay: z.boolean().nullable(),
  hasPrivateRoom: z.boolean().nullable(),
  hasSharedRoom: z.boolean().nullable(),
  hasIndependentCare: z.boolean().nullable(),
  hasSemiDependent: z.boolean().nullable(),
  hasDependent: z.boolean().nullable(),
  hasHighComplexity: z.boolean().nullable(),
  has24hMedical: z.boolean().nullable(),
  has24hNursing: z.boolean().nullable(),
  hasPresentialDoctor: z.boolean().nullable(),
  hasKinesiology: z.boolean().nullable(),
  hasMedicationSupply: z.boolean().nullable(),
  hasAttentionForNeurologicalDiseases: z.boolean().nullable(),
  mainImage: z.string().optional(),
  address: z.string({ message: "Ingrese una dirección válida" }).min(1, "Ingrese una dirección válida"),
  street: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  province: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  images: z
    .array(
      z.object({
        preview: z.string(),
        file: z.instanceof(File),
      })
    )
    .min(1, "Debe subir al menos una imagen"),
});

export type GeriatricFormWithImages = z.infer<typeof geriatricSchema>;

interface GeriatricFormProps {
  initialData?: GeriatricFormData;
  onSubmit: (data: Omit<GeriatricFormWithImages, "images"> & { imageUrls: string[] }) => Promise<void>;
  isLoading?: boolean;
}

export function GeriatricForm({ initialData, onSubmit, isLoading }: GeriatricFormProps) {
  const methods = useForm<GeriatricFormWithImages>({
    resolver: zodResolver(geriatricSchema),
    defaultValues: initialData || {
      hasDayCare: null,
      hasPermanentStay: null,
      hasPrivateRoom: null,
      hasSharedRoom: null,
      hasIndependentCare: null,
      hasSemiDependent: null,
      hasDependent: null,
      hasHighComplexity: null,
      has24hMedical: null,
      has24hNursing: null,
      hasPresentialDoctor: null,
      hasKinesiology: null,
      hasMedicationSupply: null,
      hasAttentionForNeurologicalDiseases: null,
      images: [],
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const handlePlaceSelect = (place: Place) => {
    setValue("address", place.address);
    setValue("street", place.street);
    setValue("streetNumber", place.streetNumber);
    setValue("city", place.city);
    setValue("province", place.province);
    setValue("country", place.country);
    setValue("latitude", place.latitude);
    setValue("longitude", place.longitude);
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const { data } = await axios.post("/api/cloudinary-signature");
    const { signature, timestamp, apiKey } = data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const response = await axios.post(CLOUDINARY_API_URL, formData);
    return response.data.secure_url;
  };

  const uploadImagesToCloudinary = async (images: { file: File }[]): Promise<string[]> => {
    setUploading(true);
    try {
      const uploadPromises = images.map((image) => uploadImageToCloudinary(image.file));
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (error) {
      console.error("Error uploading images to Cloudinary", error);
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (data: GeriatricFormWithImages) => {
    let imageUrls: string[] = [];

    if (data.images.length > 0) {
      imageUrls = await uploadImagesToCloudinary(data.images);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { images, ...formData } = data;
    await onSubmit({ ...formData, imageUrls });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-4xl mx-auto">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Información Básica</h2>
          <div className="space-y-4">
            <Input {...register("name")} placeholder="Nombre de la Residencia" error={errors.name?.message} />
            <Input {...register("description")} placeholder="Descripción de la Residencia" error={errors.description?.message} />
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("priceRangeMin", { valueAsNumber: true })}
                type="number"
                placeholder="Precio Mínimo"
                error={errors.priceRangeMin?.message}
              />
              <Input
                {...register("priceRangeMax", { valueAsNumber: true })}
                type="number"
                placeholder="Precio Máximo"
                error={errors.priceRangeMax?.message}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
          <GooglePlacesAutocomplete onPlaceSelect={handlePlaceSelect} placeholder="Buscar dirección..." />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Servicios de Estadía</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <TriStateCheckbox register={register} name="hasDayCare" label="Centro de Día" error={errors.hasDayCare} />
              <TriStateCheckbox
                register={register}
                name="hasPermanentStay"
                label="Estadía Permanente"
                error={errors.hasPermanentStay}
              />
            </div>
            <div className="space-y-4">
              <TriStateCheckbox
                register={register}
                name="hasPrivateRoom"
                label="Habitación Privada"
                error={errors.hasPrivateRoom}
              />
              <TriStateCheckbox
                register={register}
                name="hasSharedRoom"
                label="Habitación Compartida"
                error={errors.hasSharedRoom}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Nivel de Dependencia</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <TriStateCheckbox {...register("hasIndependentCare")} label="Independiente" error={errors.hasIndependentCare} />
              <TriStateCheckbox {...register("hasSemiDependent")} label="Semi-dependiente" error={errors.hasSemiDependent} />
            </div>
            <div className="space-y-4">
              <TriStateCheckbox {...register("hasDependent")} label="Dependiente" error={errors.hasDependent} />
              <TriStateCheckbox {...register("hasHighComplexity")} label="Alta Complejidad" error={errors.hasHighComplexity} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Servicios Médicos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <TriStateCheckbox {...register("has24hMedical")} label="Atención Médica 24hs" error={errors.has24hMedical} />
              <TriStateCheckbox {...register("has24hNursing")} label="Enfermería 24hs" error={errors.has24hNursing} />
              <TriStateCheckbox
                {...register("hasPresentialDoctor")}
                label="Doctor Presencial"
                error={errors.hasPresentialDoctor}
              />
            </div>
            <div className="space-y-4">
              <TriStateCheckbox {...register("hasKinesiology")} label="Kinesiología" error={errors.hasKinesiology} />
              <TriStateCheckbox
                {...register("hasMedicationSupply")}
                label="Suministro de Medicamentos"
                error={errors.hasMedicationSupply}
              />
              <TriStateCheckbox
                {...register("hasAttentionForNeurologicalDiseases")}
                label="Atención para Enfermedades Neurológicas"
                error={errors.hasAttentionForNeurologicalDiseases}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Imágenes</h2>
          <ImageUploader />
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading || uploading} className="w-full md:w-auto">
            {isLoading || uploading ? "Guardando..." : "Guardar Residencia"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
