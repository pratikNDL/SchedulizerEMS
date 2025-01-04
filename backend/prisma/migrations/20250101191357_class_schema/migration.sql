-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "electiveBasketId" TEXT;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_electiveBasketId_fkey" FOREIGN KEY ("electiveBasketId") REFERENCES "ElectiveBasket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
