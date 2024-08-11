"use server";

import db from "@/db/db";

export async function userOrderExists(email: string, carId: string) {
  return (
    (await db.order.findFirst({
      where: { user: { email }, carId },
      select: { id: true },
    })) != null
  );
}
