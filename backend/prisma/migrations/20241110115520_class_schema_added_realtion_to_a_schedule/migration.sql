/*
  Warnings:

  - You are about to drop the column `StudentGroupId` on the `Class` table. All the data in the column will be lost.
  - Added the required column `studentGroupId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_StudentGroupId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "StudentGroupId",
ADD COLUMN     "studentGroupId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_studentGroupId_fkey" FOREIGN KEY ("studentGroupId") REFERENCES "StudentGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
