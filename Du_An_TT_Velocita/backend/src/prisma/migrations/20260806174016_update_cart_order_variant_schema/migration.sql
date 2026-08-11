/*
  Warnings:

  - A unique constraint covering the columns `[cart_id,product_id,variant_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,size,color]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `variant_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `product_color` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cart_items_cart_id_product_id_variant_id_key` ON `cart_items`(`cart_id`, `product_id`, `variant_id`);

-- CreateIndex
CREATE UNIQUE INDEX `product_variants_product_id_size_color_key` ON `product_variants`(`product_id`, `size`, `color`);

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_variant_id_fkey` FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
