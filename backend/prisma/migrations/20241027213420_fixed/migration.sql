/*
  Warnings:

  - You are about to drop the column `batchSize` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "batchSize",
ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 0;
