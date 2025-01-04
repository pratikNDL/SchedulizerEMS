/*
  Warnings:

  - You are about to drop the column `strength` on the `Batch` table. All the data in the column will be lost.
  - You are about to drop the column `batchId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `strength` on the `StudentGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_batchId_fkey";

-- AlterTable
ALTER TABLE "Batch" DROP COLUMN "strength",
ADD COLUMN     "headCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "batchId";

-- AlterTable
ALTER TABLE "StudentGroup" DROP COLUMN "strength",
ADD COLUMN     "headCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_BatchToClass" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BatchToClass_AB_unique" ON "_BatchToClass"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchToClass_B_index" ON "_BatchToClass"("B");

-- AddForeignKey
ALTER TABLE "_BatchToClass" ADD CONSTRAINT "_BatchToClass_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToClass" ADD CONSTRAINT "_BatchToClass_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
