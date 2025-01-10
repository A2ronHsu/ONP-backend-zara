-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "product_category_id" TEXT NOT NULL,
    "home" BOOLEAN NOT NULL,
    "larger_home_image_url" TEXT,
    "small_home_image_url" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
