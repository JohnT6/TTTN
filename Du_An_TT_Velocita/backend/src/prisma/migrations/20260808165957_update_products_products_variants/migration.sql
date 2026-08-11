/*
  Warnings:

  - You are about to drop the column `color` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id,size]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - Made the column `size` on table `product_variants` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product_variants` DROP FOREIGN KEY `product_variants_product_id_fkey`;

-- DropIndex
DROP INDEX `product_variants_product_id_size_color_key` ON `product_variants`;

-- AlterTable
ALTER TABLE `product_variants` DROP COLUMN `color`,
    DROP COLUMN `image`,
    DROP COLUMN `price`,
    MODIFY `size` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `quantity`,
    ADD COLUMN `color_name` VARCHAR(100) NULL,
    ADD COLUMN `style_code` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `product_variants_product_id_size_key` ON `product_variants`(`product_id`, `size`);

-- CreateIndex
CREATE INDEX `products_style_code_idx` ON `products`(`style_code`);

-- AddForeignKey
ALTER TABLE `product_variants` ADD CONSTRAINT `product_variants_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
