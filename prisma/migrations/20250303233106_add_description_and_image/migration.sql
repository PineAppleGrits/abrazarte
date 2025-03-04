/*
  Warnings:

  - Added the required column `description` to the `Geriatric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Geriatric" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "geriatricId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_geriatricId_fkey" FOREIGN KEY ("geriatricId") REFERENCES "Geriatric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
