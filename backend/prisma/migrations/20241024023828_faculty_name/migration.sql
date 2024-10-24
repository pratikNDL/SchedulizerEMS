/*
  Warnings:

  - Added the required column `name` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "name" TEXT NOT NULL;
