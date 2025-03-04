-- CreateEnum
CREATE TYPE "Therapy" AS ENUM ('KINESIOLOGY', 'OCCUPATIONAL', 'PSYCHOLOGICAL', 'NUTRITIONIST');

-- CreateTable
CREATE TABLE "Geriatric" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "priceRangeMin" DOUBLE PRECISION,
    "priceRangeMax" DOUBLE PRECISION,
    "hasDayCare" BOOLEAN NOT NULL DEFAULT false,
    "hasPermanentStay" BOOLEAN NOT NULL DEFAULT false,
    "hasPrivateRoom" BOOLEAN NOT NULL DEFAULT false,
    "hasSharedRoom" BOOLEAN NOT NULL DEFAULT false,
    "hasPrivateBath" BOOLEAN NOT NULL DEFAULT false,
    "hasSharedBath" BOOLEAN NOT NULL DEFAULT false,
    "hasBasicCare" BOOLEAN NOT NULL DEFAULT false,
    "hasSpecializedCare" BOOLEAN NOT NULL DEFAULT false,
    "hasAlzheimerCare" BOOLEAN NOT NULL DEFAULT false,
    "hasReducedMobility" BOOLEAN NOT NULL DEFAULT false,
    "has24hMedical" BOOLEAN NOT NULL DEFAULT false,
    "mainImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Geriatric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeriatricTherapy" (
    "id" TEXT NOT NULL,
    "geriatricId" TEXT NOT NULL,
    "therapy" "Therapy" NOT NULL,

    CONSTRAINT "GeriatricTherapy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "geriatricId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "filters" JSONB NOT NULL,
    "resultsCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "geriatricId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeriatricTherapy_geriatricId_therapy_key" ON "GeriatricTherapy"("geriatricId", "therapy");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_geriatricId_key" ON "Favorite"("userId", "geriatricId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_geriatricId_key" ON "Review"("userId", "geriatricId");

-- AddForeignKey
ALTER TABLE "GeriatricTherapy" ADD CONSTRAINT "GeriatricTherapy_geriatricId_fkey" FOREIGN KEY ("geriatricId") REFERENCES "Geriatric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_geriatricId_fkey" FOREIGN KEY ("geriatricId") REFERENCES "Geriatric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_geriatricId_fkey" FOREIGN KEY ("geriatricId") REFERENCES "Geriatric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
