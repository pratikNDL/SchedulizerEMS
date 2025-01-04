/*
  Warnings:

  - You are about to drop the `_LinkedClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LinkedClasses" DROP CONSTRAINT "_LinkedClasses_A_fkey";

-- DropForeignKey
ALTER TABLE "_LinkedClasses" DROP CONSTRAINT "_LinkedClasses_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "electiveBasketId" TEXT;

-- DropTable
DROP TABLE "_LinkedClasses";

-- CreateTable
CREATE TABLE "ElectiveBasket" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ElectiveBasket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_electiveBasketId_fkey" FOREIGN KEY ("electiveBasketId") REFERENCES "ElectiveBasket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
