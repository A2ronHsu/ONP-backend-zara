-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_customer_category_id_fkey";

-- AlterTable
ALTER TABLE "product_category" ALTER COLUMN "customer_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_customer_category_id_fkey" FOREIGN KEY ("customer_category_id") REFERENCES "customer_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
