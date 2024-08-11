import { CarCard, CarCardSkeleton } from "@/components/CarCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

const getCars = cache(() => {
  return db.car.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: { name: "asc" },
  });
},["/cars", "getCars"])

export default function CarsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
            <CarCardSkeleton />
          </>
        }
      >
        <CarsSuspense />
      </Suspense>
    </div>
  );
}

async function CarsSuspense() {
  const cars = await getCars();
  return cars.map((car) => <CarCard key={car.id} {...car} />);
}
