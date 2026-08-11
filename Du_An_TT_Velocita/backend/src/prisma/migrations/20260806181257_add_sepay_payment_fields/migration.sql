-- AlterTable
ALTER TABLE `orders` ADD COLUMN `bank_code` VARCHAR(50) NULL,
    ADD COLUMN `paid_at` TIMESTAMP(0) NULL,
    ADD COLUMN `payment_expired_at` TIMESTAMP(0) NULL;
