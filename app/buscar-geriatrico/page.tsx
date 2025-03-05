"use client";

import { Suspense } from "react";
import SearchPage from "./SearchPage";

export const dynamic = "force-dynmic";

export default function BuscarGeriatrico() {
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <Suspense fallback={<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>}>
        <SearchPage />
      </Suspense>
    </div>
  );
}
