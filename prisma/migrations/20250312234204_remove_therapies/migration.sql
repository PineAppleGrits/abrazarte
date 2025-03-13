/*
  Warnings:

  - You are about to drop the column `hasAlzheimerCare` on the `Geriatric` table. All the data in the column will be lost.
  - You are about to drop the column `hasBasicCare` on the `Geriatric` table. All the data in the column will be lost.
  - You are about to drop the column `hasPrivateBath` on the `Geriatric` table. All the data in the column will be lost.
  - You are about to drop the column `hasReducedMobility` on the `Geriatric` table. All the data in the column will be lost.
  - You are about to drop the column `hasSharedBath` on the `Geriatric` table. All the data in the column will be lost.
  - You are about to drop the column `hasSpecializedCare` on the `Geriatric` table. All the data in the column will be lost.
  - You are about to drop the `GeriatricTherapy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GeriatricTherapy" DROP CONSTRAINT "GeriatricTherapy_geriatricId_fkey";

-- AlterTable
ALTER TABLE "Geriatric" DROP COLUMN "hasAlzheimerCare",
DROP COLUMN "hasBasicCare",
DROP COLUMN "hasPrivateBath",
DROP COLUMN "hasReducedMobility",
DROP COLUMN "hasSharedBath",
DROP COLUMN "hasSpecializedCare",
ADD COLUMN     "has24hNursing" BOOLEAN DEFAULT false,
ADD COLUMN     "hasAttentionForNeurologicalDiseases" BOOLEAN DEFAULT false,
ADD COLUMN     "hasDependent" BOOLEAN DEFAULT false,
ADD COLUMN     "hasHighComplexity" BOOLEAN DEFAULT false,
ADD COLUMN     "hasIndependentCare" BOOLEAN DEFAULT false,
ADD COLUMN     "hasKinesiology" BOOLEAN DEFAULT false,
ADD COLUMN     "hasMedicationSupply" BOOLEAN DEFAULT false,
ADD COLUMN     "hasPresentialDoctor" BOOLEAN DEFAULT false,
ADD COLUMN     "hasSemiDependent" BOOLEAN DEFAULT false,
ALTER COLUMN "hasDayCare" DROP NOT NULL,
ALTER COLUMN "hasPermanentStay" DROP NOT NULL,
ALTER COLUMN "hasPrivateRoom" DROP NOT NULL,
ALTER COLUMN "hasSharedRoom" DROP NOT NULL,
ALTER COLUMN "has24hMedical" DROP NOT NULL;

-- DropTable
DROP TABLE "GeriatricTherapy";
