/*
  Warnings:

  - You are about to drop the column `published` on the `BlogPost` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "published",
ADD COLUMN     "status" "BlogStatus" NOT NULL DEFAULT 'DRAFT';
