/*
  Warnings:

  - You are about to drop the column `StudentGroupId` on the `Batch` table. All the data in the column will be lost.
  - Added the required column `studentGroupId` to the `Batch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Batch" DROP CONSTRAINT "Batch_StudentGroupId_fkey";

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "StudentGroupId",
ADD COLUMN     "studentGroupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_studentGroupId_fkey" FOREIGN KEY ("studentGroupId") REFERENCES "StudentGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
