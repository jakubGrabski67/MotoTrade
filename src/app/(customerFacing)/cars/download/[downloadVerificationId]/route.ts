import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";

export async function GET(
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { car: { select: { filePath: true, name: true } } },
  });

  if (data == null) {
    return NextResponse.redirect(new URL("/cars/download/expired", req.url));
  }

  const { size } = await fs.stat(data.car.filePath);
  const file = await fs.readFile(data.car.filePath);
  const extension = data.car.filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${data.car.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
