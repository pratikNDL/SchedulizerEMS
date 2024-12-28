/*
  Warnings:

  - You are about to drop the column `isLab` on the `Class` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ClassCategory" AS ENUM ('REGULAR_THEORY', 'REGULAR_PRACTICAL', 'PROGRAM_ELECTIVE_THEORY', 'PROGRAM_ELECTIVE_PRACTICAL');

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "isLab",
ADD COLUMN     "classType" "ClassCategory" NOT NULL DEFAULT 'REGULAR_THEORY';
