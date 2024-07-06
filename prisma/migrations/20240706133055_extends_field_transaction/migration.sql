/*
  Warnings:

  - Added the required column `category_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nominal` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_time` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('IDR');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "currency" "Currency" NOT NULL,
ADD COLUMN     "nominal" TEXT NOT NULL,
ADD COLUMN     "transaction_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" "TransactionType" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
