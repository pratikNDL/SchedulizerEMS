/*
  Warnings:

  - A unique constraint covering the columns `[name,instituteId]` on the table `ElectiveBasket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ElectiveBasket_name_instituteId_key" ON "ElectiveBasket"("name", "instituteId");
