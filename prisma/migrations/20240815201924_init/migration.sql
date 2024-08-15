-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "fuelType" TEXT NOT NULL,
    "gearboxType" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "engineDisplacement" INTEGER NOT NULL,
    "horsePower" INTEGER NOT NULL,
    "VIN" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "generation" TEXT NOT NULL,
    "doorsAmount" INTEGER NOT NULL,
    "seatsAmount" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "colorType" TEXT NOT NULL,
    "drivetrain" TEXT NOT NULL,
    "CO2Emission" TEXT NOT NULL,
    "cityFuelConsumption" TEXT NOT NULL,
    "outOfCityFuelConsumption" TEXT NOT NULL,
    "countryOfOrigin" TEXT NOT NULL,
    "hasRegistrationNumber" TEXT NOT NULL,
    "registeredInPoland" TEXT NOT NULL,
    "driverPlateNumber" TEXT NOT NULL,
    "firstRegistrationDate" TEXT NOT NULL,
    "isFirstOwner" TEXT NOT NULL,
    "servicedInASO" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "isNew" TEXT NOT NULL,
    "canNegotiate" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ComfortList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    CONSTRAINT "ComfortList_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SafetyList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    CONSTRAINT "SafetyList_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AudioAndMultimediaList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    CONSTRAINT "AudioAndMultimediaList_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OtherList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    CONSTRAINT "OtherList_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pricePaidInCents" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DownloadVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carId" TEXT NOT NULL,
    CONSTRAINT "DownloadVerification_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_VIN_key" ON "Car"("VIN");

-- CreateIndex
CREATE UNIQUE INDEX "Car_driverPlateNumber_key" ON "Car"("driverPlateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
