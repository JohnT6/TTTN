/*
  Warnings:

  - Made the column `category` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `news` MODIFY `category` ENUM('SHOWS', 'ART_CULTURE', 'GUIDE', 'GENERAL') NOT NULL DEFAULT 'GENERAL';
