import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addCar() {
  const newBrand = await prisma.brand.findFirst({
    where: { brandName: "Toyota" }, // Wyszukaj markę po nazwie
  });

  if (!newBrand) {
    throw new Error('Brand not found');
  }

  const newCar = await prisma.car.create({
    data: {
      name: "Camry",
      model: "XLE",
      year: 2020,
      mileage: 50000,
      fuelType: "Petrol",
      priceInCents: 2000000,
      description: "Comfortable and reliable sedan",
      filePath: "/cars/camry.pdf",
      imagePath: "/images/camry.jpg",
      brandId: newBrand.id,
      brandName: newBrand.brandName, // Ustaw `brandName` na nazwę marki
    },
  });

  console.log('New car added:', newCar);
}

addCar()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
