/*
  Warnings:

  - You are about to drop the column `classType` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `isLab` on the `Course` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('REGULAR_THEORY', 'REGULAR_PRACTICAL', 'PROGRAM_ELECTIVE_THEORY', 'PROGRAM_ELECTIVE_PRACTICAL');

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "classType",
ADD COLUMN     "courseType" "CourseType" NOT NULL DEFAULT 'REGULAR_THEORY';

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "isLab",
ADD COLUMN     "courseType" "CourseType" NOT NULL DEFAULT 'REGULAR_THEORY';

-- DropEnum
DROP TYPE "ClassCategory";
