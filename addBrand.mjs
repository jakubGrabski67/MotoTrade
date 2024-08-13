import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addBrand() {
  const newBrand = await prisma.brand.create({
    data: {
      brandName: "Honda", // Zmień na dowolną nazwę marki
    },
  });

  console.log('New brand added:', newBrand);
}

addBrand()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
