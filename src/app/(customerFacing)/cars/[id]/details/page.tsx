// src/app/car/[id]/page.tsx

import { PrismaClient } from '@prisma/client';
import { PageHeader } from "@/app/admin/_components/PageHeader";
import { CarViewForm } from "@/app/(customerFacing)/_components/CarViewForm";

const prisma = new PrismaClient();

export default async function CarViewDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  // Pobierz samochód z opcjami komfortu
  const car = await prisma.car.findUnique({
    where: { id },
    include: { comforts: true }, // Pobierz opcje komfortu
  });

  return (
    <>
      {/* <PageHeader>View offer</PageHeader> */}
      <CarViewForm car={car} />
    </>
  );
}
