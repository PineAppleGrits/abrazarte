/*
  Warnings:

  - Added the required column `address` to the `Geriatric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Geriatric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Geriatric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Geriatric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Geriatric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Geriatric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Geriatric" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "streetNumber" TEXT NOT NULL;
