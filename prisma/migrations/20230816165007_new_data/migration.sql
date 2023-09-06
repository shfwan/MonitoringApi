-- CreateTable
CREATE TABLE `Supir` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `supirId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL DEFAULT 'User',
    `token` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_supirId_key`(`supirId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userProfile` (
    `id` VARCHAR(36) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `bio` VARCHAR(191) NULL,

    UNIQUE INDEX `userProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kehadiran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userProfileId` VARCHAR(191) NOT NULL,
    `statusHadir` BOOLEAN NULL DEFAULT false,
    `statusIzin` BOOLEAN NULL DEFAULT false,
    `statusSakit` BOOLEAN NULL DEFAULT false,
    `description` VARCHAR(191) NULL,
    `fotoKeterangan` VARCHAR(191) NULL,
    `tanggal` VARCHAR(191) NULL,
    `jamMasuk` VARCHAR(191) NULL,
    `jamPulang` VARCHAR(191) NULL,
    `lokasi` VARCHAR(191) NULL,

    UNIQUE INDEX `Kehadiran_userProfileId_key`(`userProfileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recordKehadiran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kehadiranId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `recordKehadiran_kehadiranId_key`(`kehadiranId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_supirId_fkey` FOREIGN KEY (`supirId`) REFERENCES `Supir`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userProfile` ADD CONSTRAINT `userProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kehadiran` ADD CONSTRAINT `Kehadiran_userProfileId_fkey` FOREIGN KEY (`userProfileId`) REFERENCES `userProfile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recordKehadiran` ADD CONSTRAINT `recordKehadiran_kehadiranId_fkey` FOREIGN KEY (`kehadiranId`) REFERENCES `Kehadiran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
