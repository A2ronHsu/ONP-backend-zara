-- CreateTable
CREATE TABLE "product_category" (
    "id" TEXT NOT NULL,
    "customer_category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
