/*
  Warnings:

  - You are about to drop the column `institueId` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the `AcadmeicBlock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `instituteId` to the `Department` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AcadmeicBlock" DROP CONSTRAINT "AcadmeicBlock_institueId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_institueId_fkey";

-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_blockId_fkey";

-- DropIndex
DROP INDEX "Department_code_key";

-- DropIndex
DROP INDEX "Department_name_key";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "institueId",
ADD COLUMN     "instituteId" TEXT NOT NULL;

-- DropTable
DROP TABLE "AcadmeicBlock";

-- CreateTable
CREATE TABLE "AcademicBlock" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "blockCode" TEXT NOT NULL,
    "instituteId" TEXT NOT NULL,

    CONSTRAINT "AcademicBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcademicBlock_blockCode_key" ON "AcademicBlock"("blockCode");

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicBlock" ADD CONSTRAINT "AcademicBlock_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "AcademicBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
