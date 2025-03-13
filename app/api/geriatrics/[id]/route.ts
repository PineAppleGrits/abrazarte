import { NextResponse } from "next/server";
import prisma from "@/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const geriatric = await prisma.geriatric.findUnique({
      where: { id: params.id },
    });

    if (!geriatric) {
      return NextResponse.json({ error: "Geriatric not found" }, { status: 404 });
    }

    return NextResponse.json(geriatric);
  } catch (error) {
    console.error("Error fetching geriatric:", error);
    return NextResponse.json({ error: "Failed to fetch geriatric" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();

    const geriatric = await prisma.geriatric.update({
      where: { id: params.id },
      data: {
        ...data,
      },
    });

    return NextResponse.json(geriatric);
  } catch (error) {
    console.error("Error updating geriatric:", error);
    return NextResponse.json({ error: "Failed to update geriatric" }, { status: 500 });
  }
}
