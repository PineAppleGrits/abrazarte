"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { Save, ImageIcon, Tag, Calendar, Clock, User, FileText, Eye } from "lucide-react";

import { formatDate } from "@/lib/utils";
import TiptapEditor from "@/components/blog/TiptapEditor";

export default function CrearArticulo() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [author, setAuthor] = useState("Dra. María Rodríguez");
  const [authorRole, setAuthorRole] = useState("Especialista en Gerontología");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    router.push("/admin/blog");
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Crear nuevo artículo</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePreview} className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            {isPreview ? "Editar" : "Vista previa"}
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Guardando..." : "Guardar artículo"}
          </Button>
        </div>
      </div>

      {!isPreview ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Label htmlFor="title" className="text-lg font-medium">
                Título del artículo
              </Label>
              <Input
                id="title"
                placeholder="Escribe un título atractivo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl mt-2"
              />
            </div>

            <div>
              <Label htmlFor="excerpt" className="text-lg font-medium">
                Extracto
              </Label>
              <Input
                id="excerpt"
                placeholder="Breve descripción del artículo..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-lg font-medium mb-2 block">Contenido del artículo</Label>
              <TiptapEditor value={content} onChange={setContent} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Detalles del artículo
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="mt-1">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consejos">Consejos</SelectItem>
                      <SelectItem value="bienestar">Bienestar</SelectItem>
                      <SelectItem value="salud">Salud</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="actividades">Actividades</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="featured-image">Imagen destacada</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <Input
                      id="featured-image"
                      placeholder="URL de la imagen..."
                      value={featuredImage}
                      onChange={(e) => setFeaturedImage(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="author">Autor</Label>
                  <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="author-role">Rol del autor</Label>
                  <Input id="author-role" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="tags">Etiquetas</Label>
                  <Input
                    id="tags"
                    placeholder="Separadas por comas..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Información de publicación
              </h2>

              <div className="space-y-4">
                <div>
                  <Label>Fecha de publicación</Label>
                  <div className="mt-1 p-2 border rounded-md bg-gray-50">{formatDate(new Date())}</div>
                </div>

                <div>
                  <Label>Estado</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                      <SelectItem value="scheduled">Programado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Preview Header */}
          <div className="bg-primary/10 py-12">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="mb-4">
                  <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {category || "Categoría"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title || "Título del artículo"}</h1>
                <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">{formatDate()}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span className="text-sm">{author}</span>
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
                {featuredImage ? (
                  <img src={featuredImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
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
              {/* Author info */}
              <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="font-bold">{author}</p>
                  <p className="text-gray-600 text-sm">{authorRole}</p>
                </div>
              </div>

              {/* Post content */}
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html: content || "<p>El contenido del artículo aparecerá aquí...</p>",
                }}
              />

              {/* Tags */}
              {tags && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Etiquetas:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.split(",").map((tag, index) => (
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
