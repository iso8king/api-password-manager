/*
  Warnings:

  - Added the required column `user_id` to the `password_manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `password_manager` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `password_manager` ADD CONSTRAINT `password_manager_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
