"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Image as ImageType } from "@prisma/client"

interface GeriatricGalleryProps {
  images: ImageType[]
  name: string
}

export function GeriatricGallery({ images, name }: GeriatricGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
        <span className="text-gray-500">No hay imágenes disponibles</span>
      </div>
    )
  }

  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const selectImage = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg group">
        {/* Main image display */}
        {images.map((image, index) => (
          <div
            key={image.id}
            style={{
              display: selectedIndex === index ? "block" : "none",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={`${name} - Imagen ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation controls */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Fullscreen button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-4 right-4 rounded-full bg-white/80 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={() => setIsFullscreen(true)}
        >
          <Expand className="h-5 w-5" />
        </Button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-2 py-1 rounded-md text-sm z-10">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`relative h-[80px] w-[120px] rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all ${
                selectedIndex === index ? "ring-2 ring-brand scale-105" : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => selectImage(index)}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`Miniatura ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(false)}
            >
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
                className="w-6 h-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex].url || "/placeholder.svg"}
                alt={`${name} - Imagen a pantalla completa`}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex justify-between items-center p-4">
            <Button variant="ghost" className="text-white hover:bg-white/20" onClick={goToPrevious}>
              <ChevronLeft className="h-6 w-6 mr-2" />
              Anterior
            </Button>
            <div className="text-white">
              {selectedIndex + 1} / {images.length}
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/20" onClick={goToNext}>
              Siguiente
              <ChevronRight className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

