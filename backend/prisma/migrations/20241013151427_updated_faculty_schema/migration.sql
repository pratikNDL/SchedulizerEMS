/*
  Warnings:

  - Added the required column `instituteId` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "instituteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
