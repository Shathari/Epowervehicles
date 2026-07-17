-- AlterTable
ALTER TABLE "Product" ADD COLUMN "specLine" TEXT;

-- CreateTable
CREATE TABLE "SiteStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehiclesSold" INTEGER NOT NULL DEFAULT 0,
    "dealersCount" INTEGER NOT NULL DEFAULT 0,
    "statesCovered" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);
