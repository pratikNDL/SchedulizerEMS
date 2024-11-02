/*
  Warnings:

  - The `constraints` column on the `FacultyConstraints` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FacultyConstraints" DROP COLUMN "constraints",
ADD COLUMN     "constraints" INTEGER[];
