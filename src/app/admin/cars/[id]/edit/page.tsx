import { PageHeader } from "@/app/admin/_components/PageHeader";
import { CarForm } from "../../_components/CarForm";
import db from "@/db/db";

export default async function EditCarPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const car = await db.car.findUnique({
    where: { id },
  });

  const comfortList = await db.comfortList.findMany({});
  const safetyList = await db.safetyList.findMany({});
  const audioAndMultimediaList = await db.audioAndMultimediaList.findMany({});
  const otherList = await db.otherList.findMany({});

  return (
    <>
      <PageHeader>Edit Car</PageHeader>
      <CarForm
        car={car}
        comfortList={comfortList}
        safetyList={safetyList}
        audioAndMultimediaList={audioAndMultimediaList}
        otherList={otherList}
      />
    </>
  );
}
