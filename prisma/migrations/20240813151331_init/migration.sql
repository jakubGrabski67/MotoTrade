/*
  Warnings:

  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `brandId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `brandName` on the `Car` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Brand_brandName_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Brand";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "fuelType" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Car" ("createdAt", "description", "filePath", "fuelType", "id", "imagePath", "isAvailableForPurchase", "mileage", "model", "name", "priceInCents", "updatedAt", "year") SELECT "createdAt", "description", "filePath", "fuelType", "id", "imagePath", "isAvailableForPurchase", "mileage", "model", "name", "priceInCents", "updatedAt", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
