-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,
    `duid` VARCHAR(191) NOT NULL,
    `isLoggedIn` BOOLEAN NOT NULL DEFAULT false,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `User_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `chatName` VARCHAR(191) NULL,
    `userToUserChatId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Chat_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChatsOnUsers` (
    `userId` VARCHAR(191) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`, `chatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `chatId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Message_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChatsOnUsers` ADD CONSTRAINT `ChatsOnUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatsOnUsers` ADD CONSTRAINT `ChatsOnUsers_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `Chat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
