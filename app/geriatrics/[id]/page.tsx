import { notFound } from "next/navigation";
import { GeriatricDetails } from "./components/GeriatricDetails";
import prisma from "@/prisma";

export default async function GeriatricPage({ params }: { params: { id: string } }) {
  const geriatric = await prisma.geriatric.findUnique({
    where: { id: params.id },
    include: {
      therapies: true,
      reviews: true,
      images: true
    },
  });

  if (!geriatric) {
    notFound();
  }

  return <GeriatricDetails geriatric={geriatric} />;
}
