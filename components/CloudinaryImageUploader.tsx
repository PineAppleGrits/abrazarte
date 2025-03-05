"use client";

import { ChangeEvent, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { GeriatricFormWithImages } from "./GeriatricForm/GeriatricForm"; 

export default function ImageUploader() {
  const {
    control,
    formState: { errors },
  } = useFormContext<GeriatricFormWithImages>();


  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });


  useEffect(() => {
    return () => {
      fields.forEach((field) => URL.revokeObjectURL(field.preview));
    };
  }, [fields]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      filesArray.forEach((file) => {
        const preview = URL.createObjectURL(file);

        append({ file, preview });
      });
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg 
                  cursor-pointer bg-gray-50 focus:outline-none"
      />
      {fields.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {fields.map((field, index) => (
            <div key={field.id} className="relative">
              <img src={field.preview} alt={`preview ${index}`} className="h-20 w-20 object-cover rounded" />
              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(field.preview);
                  remove(index);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 
                           flex items-center justify-center"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}
    </div>
  );
}
