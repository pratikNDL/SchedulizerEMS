/*
  Warnings:

  - Added the required column `instituteId` to the `ElectiveBasket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ElectiveBasket" ADD COLUMN     "instituteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ElectiveBasket" ADD CONSTRAINT "ElectiveBasket_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
