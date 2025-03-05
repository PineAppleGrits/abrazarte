"use client";

import { useForm, Controller } from "react-hook-form";

import { Save, ImageIcon, Eye, Calendar, User, Clock, Tag } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import TiptapEditor from "./TiptapEditor";

export enum BlogStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface FormValues {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  author: string;
  authorRole: string;
  tags: string;
  content: string;
  status: BlogStatus;
}

interface BlogPostFormProps {
  defaultValues?: FormValues;
  categories: BlogCategory[];
  isSaving?: boolean;
}

export default function BlogPostForm({ defaultValues, categories, isSaving }: BlogPostFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues ?? {
      title: "",
      excerpt: "",
      category: "",
      featuredImage: "",
      author: "",
      authorRole: "",
      tags: "",
      content: "",
      status: BlogStatus.DRAFT,
    },
  });

  const watchContent = watch("content");
  const watchTitle = watch("title");

  const watchCategory = watch("category");
  const watchAuthor = watch("author");
  const watchAuthorRole = watch("authorRole");
  const watchTags = watch("tags");

  const [isPreview, setIsPreview] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValues?.featuredImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  async function onSubmit(data: FormValues) {
    try {
      setIsUploading(true);

      if (selectedImage) {
        const signatureResponse = await axios.post("/api/cloudinary-signature");
        const { signature, timestamp, apiKey, cloudName } = signatureResponse.data;

        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const uploadResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        data.featuredImage = uploadResponse.data.secure_url;
      }

      if (defaultValues) {
        await axios.put(`/api/blog/${defaultValues.id}`, data);
      } else {
        await axios.post(`/api/blog`, data);
      }

      router.push("/admin/blog");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al guardar el artículo");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{defaultValues ? "Editar" : "Crear nuevo"} artículo</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsPreview((is) => !is)} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {isPreview ? "Editar" : "Vista previa"}
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isSaving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar artículo"}
          </Button>
        </div>
      </div>
      {!isPreview ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side for main content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Label htmlFor="title" className="text-lg font-medium">
                  Título del artículo
                </Label>
                <Input
                  id="title"
                  placeholder="Escribe un título atractivo..."
                  {...register("title", { required: "Este campo es obligatorio" })}
                  className="text-xl mt-2"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-lg font-medium">
                  Extracto
                </Label>
                <Input
                  id="excerpt"
                  placeholder="Breve descripción del artículo..."
                  {...register("excerpt", { required: "Este campo es obligatorio" })}
                  className="mt-2"
                />
                {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt.message}</p>}
              </div>

              <div>
                <Label className="text-lg font-medium mb-2 block">Contenido del artículo</Label>
                <Controller
                  control={control}
                  name="content"
                  rules={{ required: "El contenido es obligatorio" }}
                  render={({ field: { value, onChange } }) => <TiptapEditor value={value} onChange={onChange} />}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
              </div>
            </div>

            {/* Right side for extra details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4">Detalles del artículo</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Controller
                      control={control}
                      name="category"
                      rules={{ required: "Selecciona una categoría" }}
                      render={({ field: { value, onChange } }) => (
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger id="category" className="mt-1">
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.slug}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="featuredImage">Imagen destacada</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        className="hidden"
                        id="featuredImage"
                      />

                      <div className="flex-1 border rounded-md overflow-hidden h-24 bg-gray-50">
                        {previewUrl ? (
                          <div className="relative w-full h-full">
                            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewUrl(null);
                                setSelectedImage(null);
                                setValue("featuredImage", "");
                              }}
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <div className="text-center">
                              <ImageIcon className="h-8 w-8 mx-auto mb-1" />
                              <span className="text-sm">No hay imagen</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        ) : (
                          <ImageIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    {/* Hidden input to store the image URL in the form */}
                    <input type="hidden" {...register("featuredImage")} />
                  </div>

                  <div>
                    <Label htmlFor="author">Autor</Label>
                    <Input id="author" {...register("author", { required: "El autor es obligatorio" })} className="mt-1" />
                    {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="authorRole">Rol del autor</Label>
                    <Input
                      id="authorRole"
                      {...register("authorRole", {
                        required: "El rol del autor es obligatorio",
                      })}
                      className="mt-1"
                    />
                    {errors.authorRole && <p className="text-red-500 text-sm">{errors.authorRole.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="tags">Etiquetas</Label>
                    <Input id="tags" placeholder="Separadas por comas..." {...register("tags")} className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4">Información de publicación</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Fecha de publicación</Label>
                    <div className="mt-1 p-2 border rounded-md bg-gray-50">{formatDate(new Date())}</div>
                  </div>

                  <div>
                    <Label>Estado</Label>
                    <Controller
                      control={control}
                      name="status"
                      render={({ field: { value, onChange } }) => (
                        <Select value={value} onValueChange={onChange}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona un estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={BlogStatus.DRAFT}>Borrador</SelectItem>
                            <SelectItem value={BlogStatus.PUBLISHED}>Publicado</SelectItem>
                            <SelectItem value={BlogStatus.ARCHIVED}>Archivado</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-8">
            <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Guardando..." : "Guardar artículo"}
            </Button>
          </div> */}
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Preview Header */}
          <div className="bg-primary/10 py-12">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="mb-4">
                  <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {watchCategory || "Categoría"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{watchTitle || "Título del artículo"}</h1>
                <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">{formatDate()}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span className="text-sm">{watchAuthor}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">5 min de lectura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="container mx-auto px-4 md:px-6 -mt-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt={watchTitle || "Featured image"} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon className="h-12 w-12 mb-2" />
                    <span>Imagen destacada</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="max-w-3xl mx-auto">
              {/* Author Info */}
              <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="font-bold">{watchAuthor}</p>
                  <p className="text-gray-600 text-sm">{watchAuthorRole}</p>
                </div>
              </div>

              {/* Post content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: watchContent || "<p>El contenido del artículo aparecerá aquí...</p>",
                }}
              />

              {/* Tags */}
              {watchTags && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Etiquetas:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {watchTags.split(",").map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
