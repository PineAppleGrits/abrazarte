import { FieldError, FieldPath, UseFormRegister } from "react-hook-form";
import { GeriatricFormWithImages } from "./GeriatricForm";
import { InputHTMLAttributes } from "react";

interface TriStateCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<GeriatricFormWithImages>;
  label: string;
  register?: UseFormRegister<GeriatricFormWithImages>;
  error?: FieldError;
}

export default function TriStateCheckbox({ label, error, ...rest }: TriStateCheckboxProps) {
  return (
    <div className="space-y-2">
      <label className="font-medium text-gray-700">{label}</label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" value="yes" {...rest} /> Sí
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="no" {...rest} /> No
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="" {...rest} /> No sé
        </label>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
