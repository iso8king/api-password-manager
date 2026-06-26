-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_manager` (
    `id` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `deskripsi` VARCHAR(1000) NULL,
    `url_gambar` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
