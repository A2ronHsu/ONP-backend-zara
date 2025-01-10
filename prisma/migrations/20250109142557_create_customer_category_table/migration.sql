-- CreateTable
CREATE TABLE "customer_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "customer_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_customer_category_id_fkey" FOREIGN KEY ("customer_category_id") REFERENCES "customer_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
