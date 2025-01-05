/*
  Warnings:

  - The primary key for the `FacultyAvailability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StudentGroupAvailability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[scheduleId,facultyId]` on the table `FacultyAvailability` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[scheduleId,studentGroupId]` on the table `StudentGroupAvailability` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FacultyAvailability" DROP CONSTRAINT "FacultyAvailability_pkey",
ADD CONSTRAINT "FacultyAvailability_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StudentGroupAvailability" DROP CONSTRAINT "StudentGroupAvailability_pkey",
ADD CONSTRAINT "StudentGroupAvailability_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "FacultyAvailability_scheduleId_facultyId_key" ON "FacultyAvailability"("scheduleId", "facultyId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentGroupAvailability_scheduleId_studentGroupId_key" ON "StudentGroupAvailability"("scheduleId", "studentGroupId");
