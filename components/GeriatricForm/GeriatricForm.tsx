import { useState } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Therapy } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { GooglePlacesAutocomplete, Place } from "../GooglePlacesAutocomplete";
import type { GeriatricFormData } from "./types";
import { Card } from "../ui/card";
import ImageUploader from "../CloudinaryImageUploader";

// Extend the schema to include images. araña ojo corredor
// Here we only validate other fields; images will be handled via a field array.
const geriatricSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripcion es requerida"),
  priceRangeMin: z.number({ message: "Ingrese un valor valido" }).min(0, "El precio mínimo debe ser mayor a 0"),
  priceRangeMax: z.number({ message: "Ingrese un valor valido" }).min(0, "El precio máximo debe ser mayor a 0"),
  hasDayCare: z.boolean(),
  hasPermanentStay: z.boolean(),
  hasPrivateRoom: z.boolean(),
  hasSharedRoom: z.boolean(),
  hasPrivateBath: z.boolean(),
  hasSharedBath: z.boolean(),
  hasBasicCare: z.boolean(),
  hasSpecializedCare: z.boolean(),
  hasAlzheimerCare: z.boolean(),
  hasReducedMobility: z.boolean(),
  has24hMedical: z.boolean(),
  mainImage: z.string().optional(),
  therapies: z.array(z.nativeEnum(Therapy)),
  address: z.string({ message: "Ingrese una direccion valida" }).min(1, "Ingrese una direccion valida"),
  street: z.string(),
  streetNumber: z.string(),
  city: z.string(),
  province: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  // images will be added as a field array.
  images: z
    .array(
      z.object({
        preview: z.string(),
        file: z.instanceof(File),
      })
    )
    .min(1, "Debe subir al menos una imagen"),
});

// Extend the form data type with a field array for images.
export type GeriatricFormWithImages = z.infer<typeof geriatricSchema>;

interface GeriatricFormProps {
  initialData?: GeriatricFormData;
  // onSubmit will receive the regular form data along with the image URLs
  onSubmit: (
    data: Omit<GeriatricFormWithImages, "images"> & {
      imageUrls: string[];
    }
  ) => Promise<void>;
  isLoading?: boolean;
}
export function GeriatricForm({ initialData, onSubmit, isLoading }: GeriatricFormProps) {
  const methods = useForm<GeriatricFormWithImages>({
    resolver: zodResolver(geriatricSchema),
    defaultValues: initialData || {
      therapies: [],
      hasDayCare: false,
      hasPermanentStay: false,
      hasPrivateRoom: false,
      hasSharedRoom: false,
      hasPrivateBath: false,
      hasSharedBath: false,
      hasBasicCare: false,
      hasSpecializedCare: false,
      hasAlzheimerCare: false,
      hasReducedMobility: false,
      has24hMedical: false,
      images: [],
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const [uploading, setUploading] = useState(false);

  // Cloudinary configuration
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
  // Function to upload a single image to Cloudinary using signed uploads
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    // Fetch the signature and API key from your API route
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

  // Function to upload images to Cloudinary.
  // Returns an array with the secure_url for each image.
  const uploadImagesToCloudinary = async (images: { file: File }[]): Promise<string[]> => {
    setUploading(true);
    try {
      // Map each image file to its upload promise
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

    // Check if there are images to upload
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
            <Input {...register("description")} placeholder="Descripcion de la Residencia" error={errors.description?.message} />

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
              <h3 className="font-medium text-gray-700">Tipo de Estadía</h3>
              <div className="space-y-2">
                <Checkbox {...register("hasDayCare")} label="Centro de Día" error={errors.hasDayCare?.message} />
                <Checkbox {...register("hasPermanentStay")} label="Estadía Permanente" error={errors.hasPermanentStay?.message} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Tipo de Habitación</h3>
              <div className="space-y-2">
                <Checkbox {...register("hasPrivateRoom")} label="Habitación Privada" error={errors.hasPrivateRoom?.message} />
                <Checkbox {...register("hasSharedRoom")} label="Habitación Compartida" error={errors.hasSharedRoom?.message} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Tipo de Baño</h3>
              <div className="space-y-2">
                <Checkbox {...register("hasPrivateBath")} label="Baño Privado" error={errors.hasPrivateBath?.message} />
                <Checkbox {...register("hasSharedBath")} label="Baño Compartido" error={errors.hasSharedBath?.message} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Servicios Médicos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Cuidados Básicos</h3>
              <div className="space-y-2">
                <Checkbox {...register("hasBasicCare")} label="Cuidados Básicos" error={errors.hasBasicCare?.message} />
                <Checkbox
                  {...register("hasSpecializedCare")}
                  label="Cuidados Especializados"
                  error={errors.hasSpecializedCare?.message}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Cuidados Especiales</h3>
              <div className="space-y-2">
                <Checkbox {...register("hasAlzheimerCare")} label="Cuidados Alzheimer" error={errors.hasAlzheimerCare?.message} />
                <Checkbox
                  {...register("hasReducedMobility")}
                  label="Movilidad Reducida"
                  error={errors.hasReducedMobility?.message}
                />
                <Checkbox {...register("has24hMedical")} label="Atención Médica 24hs" error={errors.has24hMedical?.message} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Terapias</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.values(Therapy).map((therapy) => (
              <Checkbox
                key={therapy}
                value={therapy}
                checked={watch("therapies").includes(therapy)}
                onCheckedChange={(checked) => {
                  const currentTherapies = watch("therapies");
                  setValue("therapies", checked ? [...currentTherapies, therapy] : currentTherapies.filter((t) => t !== therapy));
                }}
                label={getTherapyLabel(therapy)}
                error={errors.therapies?.message}
              />
            ))}
          </div>
        </Card>

        {/* Field Array for Images */}
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

// Helper function to translate therapy labels
function getTherapyLabel(therapy: Therapy): string {
  const labels: Record<Therapy, string> = {
    KINESIOLOGY: "Kinesiología",
    OCCUPATIONAL: "Terapia Ocupacional",
    PSYCHOLOGICAL: "Psicología",
    NUTRITIONIST: "Nutrición",
  };
  return labels[therapy];
}
