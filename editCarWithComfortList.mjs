import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCar(carId) {
  // Definiuj nowe dane samochodu
  const updatedCarData = {
    name: "Updated Test Car",
    brand: "BMW",
    model: "Updated Test Model",
    year: 2025,
    mileage: 1500,
    fuelType: "Diesel",
    gearboxType: "Manual",
    bodyType: "Hatchback",
    engineDisplacement: 1800,
    horsePower: 130,
    VIN: "1HGBH41J1XMN109187",
    version: "Updated Version",
    generation: "Updated Generation",
    doorsAmount: 3,
    seatsAmount: 4,
    color: "Blue",
    colorType: "Matte",
    drivetrain: "FWD",
    CO2Emission: "140g/km",
    cityFuelConsumption: "7L/100km",
    outOfCityFuelConsumption: "5L/100km",
    countryOfOrigin: "France",
    hasRegistrationNumber: "No",
    registeredInPoland: "No",
    driverPlateNumber: "XYZ987654",
    firstRegistrationDate: "2025-02-01",
    isFirstOwner: "No",
    servicedInASO: "No",
    isNew: "Used",
    canNegotiate: "Yes",
    description: "An updated test car for demonstration purposes.",
    priceInCents: 3500000,
    filePath: "cars/updated-test-car.pdf",
    imagePath: "/cars/updated-test-car.jpg",
    isAvailableForPurchase: false,
  };

  // Aktualizacja samochodu w bazie danych
  const updatedCar = await prisma.car.update({
    where: { id: carId },
    data: updatedCarData,
  });

  // Aktualizacja opcji komfortu dla tego samochodu
  const comfortOptions = [
    { optionName: "123Leather Seats", carId: carId },
    { optionName: "123Bluetooth", carId: carId },
    { optionName: "123Navigation System", carId: carId },
  ];

  // Usuń istniejące opcje komfortu dla samochodu
  await prisma.comfortList.deleteMany({
    where: { carId: carId },
  });

  // Dodaj nowe opcje komfortu
  await prisma.comfortList.createMany({
    data: comfortOptions,
  });

  console.log("Car updated with new comfort options:", updatedCar);
}

// Wywołanie funkcji z przykładowym UUID
updateCar("62657225-2086-466b-81b5-e81d9f6a3e81")
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
