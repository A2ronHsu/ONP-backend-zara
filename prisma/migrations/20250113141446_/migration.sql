/*
  Warnings:

  - Added the required column `customer_category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "customer_category_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_customer_category_id_fkey" FOREIGN KEY ("customer_category_id") REFERENCES "customer_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
