import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { imageUrls, ...geriatricData } = data;
    const geriatric = await prisma.geriatric.create({
      data: {
        ...geriatricData,
        images: {
          create: imageUrls.map((url: string) => ({
            url,
          })),
        },
        mainImage: imageUrls[0],
      },
    });

    return NextResponse.json(geriatric);
  } catch (error) {
    console.error("Error creating geriatric:", error);
    return NextResponse.json({ error: "Failed to create geriatric" }, { status: 500 });
  }
}
