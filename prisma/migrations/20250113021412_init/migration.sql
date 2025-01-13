/*
  Warnings:

  - Made the column `customer_category_id` on table `product_category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_customer_category_id_fkey";

-- AlterTable
ALTER TABLE "product_category" ALTER COLUMN "customer_category_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_customer_category_id_fkey" FOREIGN KEY ("customer_category_id") REFERENCES "customer_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
