"use client";

import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";

interface MapProps {
  latitude: number;
  longitude: number;
  name: string;
  address: string;
  phone?: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "0.5rem",
};

export function Map({ latitude, longitude, name, address, phone }: MapProps) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const center = useMemo(
    () => ({
      lat: latitude,
      lng: longitude,
    }),
    [latitude, longitude]
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      scrollwheel: true,
      styles: [
        {
          featureType: "poi.business",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );

  if (loadError) {
    return <Card className="p-4 text-center text-red-500">Error loading maps. Please try again later.</Card>;
  }

  if (!isLoaded) {
    return (
      <Card className="p-4 text-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center} options={options}>
        <Marker position={center} title={name} onClick={() => setIsInfoWindowOpen(true)}>
          {isInfoWindowOpen && (
            <InfoWindow position={center} onCloseClick={() => setIsInfoWindowOpen(false)}>
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{address}</span>
                  </div>
                  {phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">Abierto 24/7</span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Marker>
      </GoogleMap>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">Dirección</h3>
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <p className="text-gray-700">{address}</p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">Horario</h3>
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-gray-700">Abierto las 24 horas</p>
              <p className="text-sm text-gray-500">Todos los días</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
