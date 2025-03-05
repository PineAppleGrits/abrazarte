import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useLoadScript } from "@react-google-maps/api";

export type Place = {
  address: string;
  street: string;
  streetNumber: string;
  city: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
};

interface GooglePlacesAutocompleteProps {
  onPlaceSelect: (place: Place) => void;
  error?: string;
  placeholder?: string;
}

export function GooglePlacesSearch({
  onPlaceSelect,
  error,
  placeholder = "Buscar dirección...",
}: GooglePlacesAutocompleteProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  const inputRef = useRef<HTMLInputElement>(null);
  // `value` holds the current input text;
  // `isValid` indicates if the current value comes from a valid selection
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: ["AR"] },
      fields: ["address_components", "geometry", "formatted_address"],
    });

    // Prevent form submission on enter
    inputRef.current.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.address_components) return;

      const addressComponents = place.address_components;

      const getComponent = (type: string) =>
        addressComponents.find((component) => component.types.includes(type))?.long_name || "";

      const placeData: Place = {
        address: place.formatted_address!,
        street: getComponent("route"),
        streetNumber: getComponent("street_number"),
        city: getComponent("locality"),
        province: getComponent("administrative_area_level_1"),
        country: getComponent("country"),
        latitude: place.geometry.location?.lat() || 0,
        longitude: place.geometry.location?.lng() || 0,
      };

      // Update the input value to the valid, formatted address.
      setValue(place.formatted_address!);
      // mark the input as valid
      setIsValid(true);
      onPlaceSelect(placeData);
    });
  }, [isLoaded, onPlaceSelect]);

  if (!isLoaded) return <div>Cargando...</div>;

  return (
    <Input
      ref={inputRef}
      type="text"
      // The displayed value is controlled by state
      value={value}
      onChange={(e) => {
        // When the user types, update the text and mark it as not
        // valid until a valid selection is made.
        setValue(e.target.value);
        setIsValid(false);
      }}
      // On blur, if the content wasn’t validated by the autocomplete,
      // clear the input.
      onBlur={() => {
        if (!isValid) {
          setValue("");
        }
      }}
      placeholder={placeholder}
      className="w-full"
      error={error}
      // Prevent form submission on enter
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    />
  );
}
