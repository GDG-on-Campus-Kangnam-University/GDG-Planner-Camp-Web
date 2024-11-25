/*
  Warnings:

  - You are about to drop the column `blurred` on the `global_setting` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `global_setting` table. All the data in the column will be lost.
  - The `status` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[user_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('WAITING', 'SOLDOUT', 'ONSALE');

-- DropForeignKey
ALTER TABLE "global_setting" DROP CONSTRAINT "global_setting_team_id_fkey";

-- DropIndex
DROP INDEX "global_setting_team_id_key";

-- AlterTable
ALTER TABLE "global_setting" DROP COLUMN "blurred",
DROP COLUMN "team_id";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "status",
ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'WAITING';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");
