"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Algo salio mal!</h2>
      <p className="text-gray-600 mb-6">{error.message}</p>
      <Button onClick={() => reset()}>Intentar de nuevo</Button>
    </div>
  );
}
