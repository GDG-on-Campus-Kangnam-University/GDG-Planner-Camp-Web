-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "product_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "team_id" TEXT,
    CONSTRAINT "product_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team" ("team_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_product" ("description", "name", "picture", "product_id", "status") SELECT "description", "name", "picture", "product_id", "status" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE TABLE "new_team" (
    "team_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "product_id" TEXT,
    "revenue" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_team" ("name", "product_id", "revenue", "team_id") SELECT "name", "product_id", "revenue", "team_id" FROM "team";
DROP TABLE "team";
ALTER TABLE "new_team" RENAME TO "team";
CREATE UNIQUE INDEX "team_product_id_key" ON "team"("product_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
