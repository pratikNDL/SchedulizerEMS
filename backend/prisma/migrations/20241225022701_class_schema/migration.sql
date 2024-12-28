/*
  Warnings:

  - You are about to drop the `FacultyConstraints` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentGroupConstraints` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FacultyConstraints" DROP CONSTRAINT "FacultyConstraints_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "FacultyConstraints" DROP CONSTRAINT "FacultyConstraints_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "StudentGroupConstraints" DROP CONSTRAINT "StudentGroupConstraints_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "StudentGroupConstraints" DROP CONSTRAINT "StudentGroupConstraints_studentGroupId_fkey";

-- DropTable
DROP TABLE "FacultyConstraints";

-- DropTable
DROP TABLE "StudentGroupConstraints";

-- CreateTable
CREATE TABLE "FacultyAvailability" (
    "id" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "availability" INTEGER[],

    CONSTRAINT "FacultyAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentGroupAvailability" (
    "id" TEXT NOT NULL,
    "studentGroupId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "availability" INTEGER[],

    CONSTRAINT "StudentGroupAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FacultyAvailability" ADD CONSTRAINT "FacultyAvailability_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyAvailability" ADD CONSTRAINT "FacultyAvailability_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGroupAvailability" ADD CONSTRAINT "StudentGroupAvailability_studentGroupId_fkey" FOREIGN KEY ("studentGroupId") REFERENCES "StudentGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentGroupAvailability" ADD CONSTRAINT "StudentGroupAvailability_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
