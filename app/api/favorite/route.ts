import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { geriatricId } = await request.json();
    if (!geriatricId) {
      return NextResponse.json({ error: "Missing geriatricId" }, { status: 400 });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        geriatricId,
      },
    });

    return NextResponse.json({ success: true, data: favorite });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const geriatricId = searchParams.get("geriatricId");
    if (!geriatricId) {
      return NextResponse.json({ error: "Missing geriatricId" }, { status: 400 });
    }

    await prisma.favorite.delete({
      where: {
        userId_geriatricId: {
          userId: session.user.id,
          geriatricId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
