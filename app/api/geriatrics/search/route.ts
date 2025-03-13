import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { Geriatric, Image, Prisma, Review } from "@prisma/client";
import { SearchResult } from "@/types/common";

// The route will be cached for 5 minutes (300 seconds)
export const revalidate = 300;

type FetchedGeriatric = Geriatric & { reviews: Review[]; images: Image[] };

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const searchQuery = searchParams.get("searchQuery") || "";
    const rating = parseInt(searchParams.get("rating") || "0");

    const query = {
      hasDayCare: searchParams.get("hasDayCare") === "true",
      hasPermanentStay: searchParams.get("hasPermanentStay") === "true",
      hasPrivateRoom: searchParams.get("hasPrivateRoom") === "true",
      hasSharedRoom: searchParams.get("hasSharedRoom") === "true",
      hasIndependentCare: searchParams.get("hasIndependentCare") === "true",
      hasSemiDependent: searchParams.get("hasSemiDependent") === "true",
      hasDependent: searchParams.get("hasDependent") === "true",
      hasHighComplexity: searchParams.get("hasHighComplexity") === "true",
      has24hMedical: searchParams.get("has24hMedical") === "true",
      has24hNursing: searchParams.get("has24hNursing") === "true",
      hasPresentialDoctor: searchParams.get("hasPresentialDoctor") === "true",
      hasKinesiology: searchParams.get("hasKinesiology") === "true",
      hasMedicationSupply: searchParams.get("hasMedicationSupply") === "true",
      hasAttentionForNeurologicalDiseases: searchParams.get("hasAttentionForNeurologicalDiseases") === "true",
    };

    const priceRangeMin = searchParams.get("priceRangeMin")
      ? parseInt(searchParams.get("priceRangeMin") as string, 10)
      : undefined;
    const priceRangeMax = searchParams.get("priceRangeMax")
      ? parseInt(searchParams.get("priceRangeMax") as string, 10)
      : undefined;

    const country = searchParams.get("country") || "";
    const city = searchParams.get("city") || "";
    const province = searchParams.get("province") || "";

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 15);
    const skip = (page - 1) * limit;

    const conditions: Prisma.GeriatricWhereInput[] = Object.entries(query).flatMap(([key, value]) =>
      value ? [{ [key]: true }] : []
    );

    conditions.push({
      rating: {
        gte: rating,
      },
    });

    conditions.push({
      OR: [
        {
          name: {
            contains: searchQuery,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          address: {
            contains: searchQuery,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    });

    if (country) {
      conditions.push({
        country: {
          contains: country,
          mode: Prisma.QueryMode.insensitive,
        },
      });
    }
    if (city) {
      conditions.push({
        city: {
          contains: city,
          mode: Prisma.QueryMode.insensitive,
        },
      });
    }
    if (province) {
      conditions.push({
        province: {
          contains: province,
          mode: Prisma.QueryMode.insensitive,
        },
      });
    }

    if (priceRangeMin !== undefined) {
      conditions.push({ priceRangeMin: { gte: priceRangeMin } });
    }
    if (priceRangeMax !== undefined) {
      conditions.push({ priceRangeMax: { lte: priceRangeMax } });
    }

    const where: Prisma.GeriatricWhereInput = { AND: conditions };

    const commonInclude = {
      reviews: {
        select: { rating: true },
      },
      images: true,
    };

    const total = await prisma.geriatric.count({ where });

    const primaryResultsRaw = (await prisma.geriatric.findMany({
      where,
      include: commonInclude,
      skip,
      take: limit,
      orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    })) as FetchedGeriatric[];

    const transformGeriatric = (geriatric: FetchedGeriatric) => ({
      ...geriatric,
      // rating: (geriatric.reviews || []).reduce((acc, review) => acc + review.rating, 0) / geriatric.reviews.length,
      images: geriatric.images.map((img: Image) => img.url),
      reviewCount: geriatric.reviews.length,
    });

    const geriatrics = primaryResultsRaw.map(transformGeriatric);

    const primaryIds = primaryResultsRaw.map((item: Geriatric) => item.id);

    const secondaryProvinceResults = (await prisma.geriatric.findMany({
      where: {
        AND: [{ id: { notIn: primaryIds } }],
      },
      include: commonInclude,
      take: 5,
      orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    })) as FetchedGeriatric[];

    const secondaryResults = secondaryProvinceResults.map(transformGeriatric);

    const pagination = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + limit < total,
    };

    const response = NextResponse.json({
      geriatrics,
      secondaryResults,
      pagination,
    } as SearchResult);

    return response;
  } catch (error) {
    console.error("Search error:", error);

    const errorResponse = NextResponse.json({ error: "Error al buscar residencias geriátricas" }, { status: 500 });

    return errorResponse;
  }
}
