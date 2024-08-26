import { PageHeader } from "@/app/admin/_components/PageHeader";
import db from "@/db/db";
import { CarViewForm } from "@/app/(customerFacing)/_components/CarViewForm";

export default async function CarViewDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const car = await db.car.findUnique({
    where: { id },
    include: {
      comfortList: true,
     // safetyList: true,
     // audioAndMultimediaList: true,
     // otherList: true,
    },
  });

  return (
    <>
      {/* <PageHeader>View offer</PageHeader> */}
      <CarViewForm car={car} />
    </>
  );
}
