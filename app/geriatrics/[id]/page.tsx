import { notFound } from "next/navigation";

import prisma from "@/prisma";
import { GeriatricDetailsPage } from "./components/GeriatricDetails";


export default async function GeriatricPage({ params }: { params: { id: string } }) {
  const geriatric = await prisma.geriatric.findUnique({
    where: { id: params.id },
    include: {
      reviews: true,
      images: true
    },
  });

  if (!geriatric) {
    notFound();
  }

  return <GeriatricDetailsPage geriatric={geriatric} />;
}
