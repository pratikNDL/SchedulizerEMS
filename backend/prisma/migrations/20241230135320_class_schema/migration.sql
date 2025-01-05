/*
  Warnings:

  - You are about to drop the column `instituteId` on the `ElectiveBasket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,code,departmentId]` on the table `ElectiveBasket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `ElectiveBasket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `ElectiveBasket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "ElectiveBasket" DROP CONSTRAINT "ElectiveBasket_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_instituteId_fkey";

-- DropIndex
DROP INDEX "ElectiveBasket_name_instituteId_key";

-- AlterTable
ALTER TABLE "ElectiveBasket" DROP COLUMN "instituteId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "departmentId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ElectiveBasket_name_code_departmentId_key" ON "ElectiveBasket"("name", "code", "departmentId");

-- AddForeignKey
ALTER TABLE "ElectiveBasket" ADD CONSTRAINT "ElectiveBasket_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
