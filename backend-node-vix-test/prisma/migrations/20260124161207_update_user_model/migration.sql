-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_idBrandMaster_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `department` VARCHAR(191) NULL,
    ADD COLUMN `fullname` VARCHAR(191) NULL,
    ADD COLUMN `hiringDate` DATETIME(0) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `position` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_idBrandMaster_fkey` FOREIGN KEY (`idBrandMaster`) REFERENCES `brandMaster`(`idBrandMaster`) ON DELETE CASCADE ON UPDATE CASCADE;
