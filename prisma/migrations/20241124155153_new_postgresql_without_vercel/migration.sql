-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 100000,
    "role" TEXT NOT NULL,
    "team_id" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "team" (
    "team_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "product_id" TEXT,
    "revenue" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "team_pkey" PRIMARY KEY ("team_id")
);

-- CreateTable
CREATE TABLE "product" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "team_id" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "model" (
    "model_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total_count" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "product_id" TEXT,

    CONSTRAINT "model_pkey" PRIMARY KEY ("model_id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "purchase_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "model_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("purchase_id")
);

-- CreateTable
CREATE TABLE "global_setting" (
    "id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "blurred" BOOLEAN NOT NULL,

    CONSTRAINT "global_setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_product_id_key" ON "team"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "global_setting_team_id_key" ON "global_setting"("team_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("team_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "model" ADD CONSTRAINT "model_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "model"("model_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_setting" ADD CONSTRAINT "global_setting_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("team_id") ON DELETE RESTRICT ON UPDATE CASCADE;
