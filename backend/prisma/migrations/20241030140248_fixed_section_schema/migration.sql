/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `SectionId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `StudentGroupId` to the `Batch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StudentGroupId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_SectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_departmentId_fkey";

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "sectionId",
ADD COLUMN     "StudentGroupId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "SectionId",
ADD COLUMN     "StudentGroupId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Section";

-- CreateTable
CREATE TABLE "StudentGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "batchCount" INTEGER NOT NULL,
    "passingYear" INTEGER NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "StudentGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentGroup" ADD CONSTRAINT "StudentGroup_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_StudentGroupId_fkey" FOREIGN KEY ("StudentGroupId") REFERENCES "StudentGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_StudentGroupId_fkey" FOREIGN KEY ("StudentGroupId") REFERENCES "StudentGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
