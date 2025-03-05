import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { Geriatric, GeriatricTherapy, Image, Prisma, Review, Therapy } from "@prisma/client";
import { SearchResult } from "@/types/common";

export const dynamic = "force-dynamic";

type FetchedGeriatric = Geriatric & { reviews: Review[]; therapies: GeriatricTherapy[]; images: Image[] };

function mapTherapy(value: string): Therapy | undefined {
  switch (value.toLowerCase()) {
    case "kinesiology":
      return Therapy.KINESIOLOGY;
    case "occupational":
      return Therapy.OCCUPATIONAL;
    case "psychological":
      return Therapy.PSYCHOLOGICAL;
    case "nutritionist":
      return Therapy.NUTRITIONIST;
    default:
      return undefined;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;


    const searchQuery = searchParams.get("searchQuery") || "";

    const hasDayCare = searchParams.get("hasDayCare") === "true";
    const hasPermanentStay = searchParams.get("hasPermanentStay") === "true";
    const hasPrivateRoom = searchParams.get("hasPrivateRoom") === "true";
    const hasSharedRoom = searchParams.get("hasSharedRoom") === "true";
    const hasPrivateBath = searchParams.get("hasPrivateBath") === "true";
    const hasSharedBath = searchParams.get("hasSharedBath") === "true";
    const hasBasicCare = searchParams.get("hasBasicCare") === "true";
    const hasSpecializedCare = searchParams.get("hasSpecializedCare") === "true";
    const hasAlzheimerCare = searchParams.get("hasAlzheimerCare") === "true";
    const hasReducedMobility = searchParams.get("hasReducedMobility") === "true";
    const has24hMedical = searchParams.get("has24hMedical") === "true";


    const rawTherapies = searchParams.getAll("therapies");
    const therapies: Therapy[] = rawTherapies
      .map((therapy) => mapTherapy(therapy))
      .filter((therapy): therapy is Therapy => therapy !== undefined);

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


    const conditions: Prisma.GeriatricWhereInput[] = [];


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


    if (hasDayCare) conditions.push({ hasDayCare: true });
    if (hasPermanentStay) conditions.push({ hasPermanentStay: true });


    if (hasPrivateRoom) conditions.push({ hasPrivateRoom: true });
    if (hasSharedRoom) conditions.push({ hasSharedRoom: true });


    if (hasPrivateBath) conditions.push({ hasPrivateBath: true });
    if (hasSharedBath) conditions.push({ hasSharedBath: true });


    if (hasBasicCare) conditions.push({ hasBasicCare: true });
    if (hasSpecializedCare) conditions.push({ hasSpecializedCare: true });
    if (hasAlzheimerCare) conditions.push({ hasAlzheimerCare: true });
    if (hasReducedMobility) conditions.push({ hasReducedMobility: true });
    if (has24hMedical) conditions.push({ has24hMedical: true });


    if (priceRangeMin !== undefined) {
      conditions.push({ priceRangeMin: { gte: priceRangeMin } });
    }
    if (priceRangeMax !== undefined) {
      conditions.push({ priceRangeMax: { lte: priceRangeMax } });
    }

    if (therapies.length > 0) {
      therapies.forEach((therapy) => {
        conditions.push({
          therapies: { some: { therapy } },
        });
      });
    }

    const where: Prisma.GeriatricWhereInput = { AND: conditions };


    const commonInclude = {
      therapies: true,
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
      rating: (geriatric.reviews || []).reduce((acc, review) => acc + review.rating, 0) / geriatric.reviews.length,
      therapies: geriatric.therapies.map((t: GeriatricTherapy) => t.therapy),
      images: geriatric.images.map((img: Image) => img.url),
      reviewCount: geriatric.reviews.length,
    });

    const geriatrics = primaryResultsRaw.map(transformGeriatric);


    const primaryIds = primaryResultsRaw.map((item: Geriatric) => item.id);


    const secondaryProvinceResults = (await prisma.geriatric.findMany({
      where: {
        AND: [
          { id: { notIn: primaryIds } },

        ],
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



    const hasSpecificFilters =
      Boolean(searchQuery) ||
      Boolean(city) ||
      Boolean(province) ||
      hasDayCare ||
      hasPermanentStay ||
      hasPrivateRoom ||
      hasSharedRoom ||
      hasPrivateBath ||
      hasSharedBath ||
      hasBasicCare ||
      hasSpecializedCare ||
      hasAlzheimerCare ||
      hasReducedMobility ||
      has24hMedical ||
      therapies.length > 0;


    let cacheTime = 300;


    if (hasSpecificFilters) {
      cacheTime = 600;
    }


    if (page > 1) {
      cacheTime = Math.floor(cacheTime / 2);
    }





    response.headers.set(
      "Cache-Control",
      `s-maxage=${cacheTime}, max-age=${Math.floor(cacheTime / 2)}, stale-while-revalidate=${cacheTime * 2}`
    );

    return response;
  } catch (error) {
    console.error("Search error:", error);


    const errorResponse = NextResponse.json({ error: "Error al buscar residencias geriátricas" }, { status: 500 });

    errorResponse.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

    return errorResponse;
  }
}
