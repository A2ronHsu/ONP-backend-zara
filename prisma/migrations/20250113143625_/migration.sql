/*
  Warnings:

  - You are about to drop the column `customer_category_id` on the `product_category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_customer_category_id_fkey";

-- AlterTable
ALTER TABLE "product_category" DROP COLUMN "customer_category_id";
