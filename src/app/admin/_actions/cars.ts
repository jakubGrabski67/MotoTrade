"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1),
  mileage: z.coerce.number().int().min(1),
  fuelType: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export async function addCar(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("cars", { recursive: true });
  const filePath = `cars/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/cars", { recursive: true });
  const imagePath = `/cars/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public/${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.car.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      brand: data.brand,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      fuelType: data.fuelType,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/cars");
}

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateCar(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const car = await db.car.findUnique({ where: { id } });

  if (car == null) return notFound();

  let filePath = car.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(car.filePath);
    filePath = `cars/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = car.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${car.imagePath}`);
    imagePath = `/cars/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public/${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.car.update({
    where: { id },
    data: {
      name: data.name,
      brand: data.brand,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      fuelType: data.fuelType,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/cars");
}

export async function toggleCarAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.car.update({ where: { id }, data: { isAvailableForPurchase } });
}

export async function deleteCar(id: string) {
  const car = await db.car.delete({ where: { id } });
  if (car == null) return notFound();

  await fs.unlink(car.filePath);
  await fs.unlink(`public${car.imagePath}`);
}
