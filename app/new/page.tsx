"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GeriatricForm } from "@/components/GeriatricForm/GeriatricForm";
import type { GeriatricFormData } from "@/components/GeriatricForm/types";

export default function NewGeriatricPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: GeriatricFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/geriatrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create geriatric");

      router.push("/geriatrics");
      router.refresh();
    } catch (error) {
      console.error("Error creating geriatric:", error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Create New Geriatric</h1>
      <GeriatricForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
