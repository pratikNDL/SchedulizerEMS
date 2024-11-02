/*
  Warnings:

  - Added the required column `instituteId` to the `StudentGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentGroup" ADD COLUMN     "instituteId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentGroup" ADD CONSTRAINT "StudentGroup_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
