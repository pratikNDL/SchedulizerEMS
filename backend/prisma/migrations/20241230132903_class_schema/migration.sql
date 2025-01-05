/*
  Warnings:

  - Added the required column `courseCount` to the `ElectiveBasket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `credits` to the `ElectiveBasket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ElectiveBasket" ADD COLUMN     "courseCount" INTEGER NOT NULL,
ADD COLUMN     "credits" INTEGER NOT NULL;
