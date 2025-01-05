/*
  Warnings:

  - A unique constraint covering the columns `[code,departmentId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_code_departmentId_key" ON "Course"("code", "departmentId");
