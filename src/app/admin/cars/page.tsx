import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropDownItem,
} from "./_components/CarActions";

export default function AdminCarsPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Cars</PageHeader>
        <Button asChild>
          <Link href="/admin/cars/new">Add Car</Link>
        </Button>
      </div>
      <CarsTable />
    </>
  );
}

async function CarsTable() {
  const cars = await db.car.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      _count: { select: { Order: true } },
    },
    orderBy: { name: "asc" },
  });

  if (cars.length === 0) return <p>No cars found.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars.map((car) => (
          <TableRow key={car.id}>
            <TableCell>
              {car.isAvailableForPurchase ? (
                <>
                  <span className="sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="sr-only">Unavailable</span>
                  <XCircle className="stroke-destructive" />
                </>
              )}
            </TableCell>
            <TableCell>{car.name}</TableCell>
            <TableCell>{formatCurrency(car.priceInCents / 100)}</TableCell>
            <TableCell>{formatNumber(car._count.Order)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <a download href={`/admin/cars/${car.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/cars/${car.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={car.id}
                    isAvailableForPurchase={car.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropDownItem
                    id={car.id}
                    disabled={car._count.Order > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
