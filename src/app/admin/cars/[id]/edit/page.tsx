import { PageHeader } from "@/app/admin/_components/PageHeader";
import { CarForm } from "../../_components/CarForm";
import db from "@/db/db";

export default async function EditCarPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const car = await db.car.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Car</PageHeader>
      <CarForm car={car} />
    </>
  );
}
