import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const car = await db.car.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });

  if (car == null) return notFound();

  const { size } = await fs.stat(car.filePath);
  const file = await fs.readFile(car.filePath);
  const extension = car.filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${car.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
