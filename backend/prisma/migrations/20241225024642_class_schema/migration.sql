/*
  Warnings:

  - The primary key for the `FacultyAvailability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StudentGroupAvailability` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FacultyAvailability" DROP CONSTRAINT "FacultyAvailability_pkey",
ADD CONSTRAINT "FacultyAvailability_pkey" PRIMARY KEY ("scheduleId", "facultyId");

-- AlterTable
ALTER TABLE "StudentGroupAvailability" DROP CONSTRAINT "StudentGroupAvailability_pkey",
ADD CONSTRAINT "StudentGroupAvailability_pkey" PRIMARY KEY ("scheduleId", "studentGroupId");
