import { CarCard, CarCardSkeleton } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Car } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const getMostPopularCars = cache(
  () => {
    return db.car.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { Order: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularCars"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestCars = cache(() => {
  return db.car.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestCars"]);

export default function HomePage() {
  return (
    <main className="space-y-12">
      <div>FILTRY</div>
      <CarGridSection title="Most Popular" carsFetcher={getMostPopularCars} />
      <CarGridSection title="Newest" carsFetcher={getNewestCars} />
    </main>
  );
}

type CarGridSectionProps = {
  title: string;
  carsFetcher: () => Promise<Car[]>;
};

function CarGridSection({ carsFetcher, title }: CarGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/cars" className="space-x-2">
            <span>View all</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <CarCardSkeleton />
              <CarCardSkeleton />
              <CarCardSkeleton />
            </>
          }
        >
          <CarSuspense carsFetcher={carsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function CarSuspense({
  carsFetcher,
}: {
  carsFetcher: () => Promise<Car[]>;
}) {
  return (await carsFetcher()).map((car) => <CarCard key={car.id} {...car} />);
}
