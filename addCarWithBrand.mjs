import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCar() {
  // Utwórz nowy pojazd wraz z opcjami komfortu
  const newCar = await prisma.car.create({
    data: {
      name: "TEST CAR",
      model: "XLE",
      year: 2020,
      mileage: 50000,
      fuelType: "Petrol",
      brand: "BMW",
      gearboxType: "Automatic",
      bodyType: "Sedan",
      engineDisplacement: 2500,
      horsePower: 200,
      VIN: "12345678901122324567",
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
      driverPlateNumber: "XYZ121234",
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
      // Dodajemy listę opcji komfortu
      comfortList: {
        create: [
          { name: "comfortList Automatic Climate Control" },
          { name: "comfortList Leather Upholstery" },
          { name: "comfortList Rear Passenger Air Conditioning" },
          { name: "comfortList Electric Driver Seat Adjustment" },
        ],
      },
      safetyList: {
        create: [
          { name: "safetyList Automatic Climate Control" },
          { name: "safetyList Leather Upholstery" },
          { name: "safetyList Rear Passenger Air Conditioning" },
          { name: "safetyList Electric Driver Seat Adjustment" },
        ],
      },
      audioAndMultimediaList: {
        create: [
          { name: "audioAndMultimediaList Automatic Climate Control" },
          { name: "audioAndMultimediaList Leather Upholstery" },
          { name: "audioAndMultimediaList Rear Passenger Air Conditioning" },
          { name: "audioAndMultimediaList Electric Driver Seat Adjustment" },
        ],
      },
      otherList: {
        create: [
          { name: "otherList Automatic Climate Control" },
          { name: "otherList Leather Upholstery" },
          { name: "otherList Rear Passenger Air Conditioning" },
          { name: "otherList Electric Driver Seat Adjustment" },
        ],
      },
    },
  });

  console.log("Car created with id:", newCar.id);
}

addCar()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
