-- AlterTable
ALTER TABLE `banners` ADD COLUMN `button_text` VARCHAR(100) NULL DEFAULT 'Khám phá ngay',
    ADD COLUMN `media_type` ENUM('IMAGE', 'VIDEO', 'BOTH') NOT NULL DEFAULT 'IMAGE',
    ADD COLUMN `sort_order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `subtitle` VARCHAR(255) NULL,
    ADD COLUMN `video_url` VARCHAR(550) NULL;

-- CreateIndex
CREATE INDEX `banners_media_type_idx` ON `banners`(`media_type`);
