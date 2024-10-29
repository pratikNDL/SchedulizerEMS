/*
  Warnings:

  - Added the required column `instituteId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "instituteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
