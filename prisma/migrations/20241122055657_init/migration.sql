-- CreateTable
CREATE TABLE `user` (
    `user_id` BIGINT NOT NULL AUTO_INCREMENT,
    `password` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `balance` BIGINT NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL,
    `team_id` BIGINT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `team_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `product_id` BIGINT NULL,
    `revenue` BIGINT NOT NULL,

    PRIMARY KEY (`team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `product_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `model` (
    `model_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `total_count` INTEGER NOT NULL,
    `price` BIGINT NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `product_id` BIGINT NULL,

    PRIMARY KEY (`model_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase` (
    `purchase_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `model_id` BIGINT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `purchase_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`purchase_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `global_setting` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `team_id` BIGINT NOT NULL,
    `blurred` BOOLEAN NOT NULL,

    UNIQUE INDEX `global_setting_team_id_key`(`team_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `team`(`team_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `model` ADD CONSTRAINT `model_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `model`(`model_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `global_setting` ADD CONSTRAINT `global_setting_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `team`(`team_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
