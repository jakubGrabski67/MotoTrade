import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCar() {
  // Definiuj dane nowego samochodu
  const newCarData = {
    name: "Test Car",
    brand: "Test Brand",
    model: "Test Model",
    year: 2024,
    mileage: 1000,
    fuelType: "Petrol",
    gearboxType: "Automatic",
    bodyType: "Sedan",
    engineDisplacement: 2000,
    horsePower: 150,
    VIN: "1HGBH41J1XMN109186",
    version: "Version 1",
    generation: "Generation 1",
    doorsAmount: 4,
    seatsAmount: 5,
    color: "Red",
    colorType: "Metallic",
    drivetrain: "AWD",
    CO2Emission: "150g/km",
    cityFuelConsumption: "8L/100km",
    outOfCityFuelConsumption: "6L/100km",
    countryOfOrigin: "Germany",
    hasRegistrationNumber: "Yes",
    registeredInPoland: "Yes",
    driverPlateNumber: "ABC121234",
    firstRegistrationDate: "2024-01-01",
    isFirstOwner: "Yes",
    servicedInASO: "Yes",
    isNew: "Yes",
    canNegotiate: "No",
    description: "A test car for demonstration purposes.",
    priceInCents: 3000000,
    filePath: "cars/test-car.pdf",
    imagePath: "/cars/test-car.jpg",
    isAvailableForPurchase: true,
  };

  // Tworzenie nowego samochodu w bazie danych
  const newCar = await prisma.car.create({
    data: newCarData,
  });

  // Dodawanie opcji komfortu dla tego samochodu
  const comfortOptions = [
    { optionName: "1Air Conditioning", carId: newCar.id },
    { optionName: "1Heated Seats", carId: newCar.id },
    { optionName: "1Cruise Control", carId: newCar.id },
  ];
  const safetyOptions = [
    { optionName: "1Air Conditioning", carId: newCar.id },
    { optionName: "1Heated Seats", carId: newCar.id },
    { optionName: "1Cruise Control", carId: newCar.id },
  ];
  const audioAndMultimediaOptions = [
    { optionName: "1Air Conditioning", carId: newCar.id },
    { optionName: "1Heated Seats", carId: newCar.id },
    { optionName: "1Cruise Control", carId: newCar.id },
  ];
  const otherOptions = [
    { optionName: "1Air Conditioning", carId: newCar.id },
    { optionName: "1Heated Seats", carId: newCar.id },
    { optionName: "1Cruise Control", carId: newCar.id },
  ];

  await prisma.comfortList.createMany({
    data: comfortOptions,
  });

  await prisma.safetyList.createMany({
    data: safetyOptions,
  });

  await prisma.audioAndMultimediaList.createMany({
    data: audioAndMultimediaOptions,
  });

  await prisma.otherList.createMany({
    data: otherOptions,
  });

  console.log("New car with comfort options added:", comfortOptions);
}

addCar()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });