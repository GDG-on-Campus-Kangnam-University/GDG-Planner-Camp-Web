-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT NOT NULL,
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
