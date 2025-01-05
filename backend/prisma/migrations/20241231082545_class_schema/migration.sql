/*
  Warnings:

  - The values [REGULAR_THEORY,REGULAR_PRACTICAL,PROGRAM_ELECTIVE_THEORY,PROGRAM_ELECTIVE_PRACTICAL] on the enum `CourseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseType_new" AS ENUM ('THEORY', 'PRACTICAL');
ALTER TABLE "Class" ALTER COLUMN "courseType" DROP DEFAULT;
ALTER TABLE "Course" ALTER COLUMN "courseType" DROP DEFAULT;
ALTER TABLE "ElectiveBasket" ALTER COLUMN "courseType" DROP DEFAULT;
ALTER TABLE "Course" ALTER COLUMN "courseType" TYPE "CourseType_new" USING ("courseType"::text::"CourseType_new");
ALTER TABLE "ElectiveBasket" ALTER COLUMN "courseType" TYPE "CourseType_new" USING ("courseType"::text::"CourseType_new");
ALTER TABLE "Class" ALTER COLUMN "courseType" TYPE "CourseType_new" USING ("courseType"::text::"CourseType_new");
ALTER TYPE "CourseType" RENAME TO "CourseType_old";
ALTER TYPE "CourseType_new" RENAME TO "CourseType";
DROP TYPE "CourseType_old";
ALTER TABLE "Class" ALTER COLUMN "courseType" SET DEFAULT 'THEORY';
ALTER TABLE "Course" ALTER COLUMN "courseType" SET DEFAULT 'THEORY';
ALTER TABLE "ElectiveBasket" ALTER COLUMN "courseType" SET DEFAULT 'THEORY';
COMMIT;

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "courseType" SET DEFAULT 'THEORY';

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "courseType" SET DEFAULT 'THEORY';

-- AlterTable
ALTER TABLE "ElectiveBasket" ALTER COLUMN "courseType" SET DEFAULT 'THEORY';
