/*
  Warnings:

  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatar` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` VARCHAR(191) NULL,
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL,
    MODIFY `avatar` VARCHAR(191) NOT NULL;
