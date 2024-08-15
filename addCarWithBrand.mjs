import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCar() {
  // Utwórz nowy pojazd
  const newCar = await prisma.car.create({
    data: {
      name: "Camry",
      model: "XLE",
      year: 2020,
      mileage: 50000,
      fuelType: "Petrol",
      brand:"BMW",
      gearboxType: "Automatic",
      bodyType: "Sedan",
      engineDisplacement: 2500,
      horsePower: 200,
      VIN: "123456789012324567",
      version: "2020",
      generation: "8th",
      doorsAmount: 4,
      seatsAmount: 5,
      color: "Silver",
      colorType: "Metallic",
      drivetrain: "FWD",
      CO2Emission: "150 g/km",
      cityFuelConsumption: "8.0 L/100km",
      outOfCityFuelConsumption: "6.0 L/100km",
      countryOfOrigin: "Japan",
      hasRegistrationNumber: "Yes",
      registeredInPoland: "No",
      driverPlateNumber: "XYZ12234",
      firstRegistrationDate: "2020-05-15",
      isFirstOwner: "Yes",
      servicedInASO: "No",
      priceInCents: 2000000,
      isNew: "No",
      canNegotiate: "Yes",
      description: "Comfortable and reliable sedan",
      filePath: "/cars/camry.pdf",
      imagePath: "/images/camry.jpg",
      isAvailableForPurchase: true,
    },
  });

  console.log('New car added:', newCar);

  // Dodaj opcje komfortu
  await prisma.comfort.createMany({
    data: [
      { option: "Leather seats", carId: newCar.id },
      { option: "Navigation system", carId: newCar.id },
      { option: "Sunroof", carId: newCar.id }
    ],
  });

  console.log('Comfort options added for car:', newCar.id);
}

addCar()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
