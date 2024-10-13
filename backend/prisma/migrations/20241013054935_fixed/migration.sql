/*
  Warnings:

  - You are about to drop the column `emial` on the `Institute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Institute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Institute` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Institute_emial_key";

-- AlterTable
ALTER TABLE "Institute" DROP COLUMN "emial",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Institute_email_key" ON "Institute"("email");
