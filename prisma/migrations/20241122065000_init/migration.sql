/*
  Warnings:

  - The primary key for the `global_setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `model` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `team` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_global_setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team_id" TEXT NOT NULL,
    "blurred" BOOLEAN NOT NULL,
    CONSTRAINT "global_setting_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team" ("team_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_global_setting" ("blurred", "id", "team_id") SELECT "blurred", "id", "team_id" FROM "global_setting";
DROP TABLE "global_setting";
ALTER TABLE "new_global_setting" RENAME TO "global_setting";
CREATE UNIQUE INDEX "global_setting_team_id_key" ON "global_setting"("team_id");
CREATE TABLE "new_model" (
    "model_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "total_count" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "product_id" TEXT,
    CONSTRAINT "model_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_model" ("description", "model_id", "name", "price", "product_id", "total_count") SELECT "description", "model_id", "name", "price", "product_id", "total_count" FROM "model";
DROP TABLE "model";
ALTER TABLE "new_model" RENAME TO "model";
CREATE TABLE "new_product" (
    "product_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_product" ("description", "name", "picture", "product_id", "status") SELECT "description", "name", "picture", "product_id", "status" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE TABLE "new_purchase" (
    "purchase_id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "model_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchase_date" DATETIME NOT NULL,
    CONSTRAINT "purchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "purchase_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "model" ("model_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_purchase" ("model_id", "purchase_date", "purchase_id", "quantity", "user_id") SELECT "model_id", "purchase_date", "purchase_id", "quantity", "user_id" FROM "purchase";
DROP TABLE "purchase";
ALTER TABLE "new_purchase" RENAME TO "purchase";
CREATE TABLE "new_team" (
    "team_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "product_id" TEXT,
    "revenue" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "team_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("product_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_team" ("name", "product_id", "revenue", "team_id") SELECT "name", "product_id", "revenue", "team_id" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE UNIQUE INDEX "team_product_id_key" ON "team"("product_id");
CREATE TABLE "new_user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 100000,
    "role" TEXT NOT NULL,
    "team_id" TEXT,
    CONSTRAINT "user_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team" ("team_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("balance", "name", "password", "role", "team_id", "user_id") SELECT "balance", "name", "password", "role", "team_id", "user_id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
