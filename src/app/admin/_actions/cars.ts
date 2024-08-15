"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
  gearboxType: z.string().min(1),
  bodyType: z.string().min(1),
  engineDisplacement: z.coerce.number().int().min(1),
  horsePower: z.coerce.number().int().min(1),
  VIN: z.string().min(1),
  version: z.string().min(1),
  generation: z.string().min(1),
  doorsAmount: z.coerce.number().int().min(1),
  seatsAmount: z.coerce.number().int().min(1),
  color: z.string().min(1),
  colorType: z.string().min(1),
  drivetrain: z.string().min(1),
  CO2Emission: z.string().min(1),
  cityFuelConsumption: z.string().min(1),
  outOfCityFuelConsumption: z.string().min(1),
  countryOfOrigin: z.string().min(1),
  hasRegistrationNumber: z.string().min(1),
  registeredInPoland: z.string().min(1),
  driverPlateNumber: z.string().min(1),
  firstRegistrationDate: z.string().min(1),
  isFirstOwner: z.string().min(1),
  servicedInASO: z.string().min(1),
  isNew: z.string().min(1),
  canNegotiate: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  comfortList: z.array(z.string().min(1)).optional(),
  safetyList: z.array(z.string().min(1)).optional(),
  audioAndMultimediaList: z.array(z.string().min(1)).optional(),
  otherList: z.array(z.string().min(1)).optional(),
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

  const car = await db.car.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      brand: data.brand,
      model: data.model,
      year: data.year,
      mileage: data.mileage,
      fuelType: data.fuelType,
      gearboxType: data.gearboxType,
      bodyType: data.bodyType,
      engineDisplacement: data.engineDisplacement,
      horsePower: data.horsePower,
      VIN: data.VIN,
      version: data.version,
      generation: data.generation,
      doorsAmount: data.doorsAmount,
      seatsAmount: data.seatsAmount,
      color: data.color,
      colorType: data.colorType,
      drivetrain: data.drivetrain,
      CO2Emission: data.CO2Emission,
      cityFuelConsumption: data.cityFuelConsumption,
      outOfCityFuelConsumption: data.outOfCityFuelConsumption,
      countryOfOrigin: data.countryOfOrigin,
      hasRegistrationNumber: data.hasRegistrationNumber,
      registeredInPoland: data.registeredInPoland,
      driverPlateNumber: data.driverPlateNumber,
      firstRegistrationDate: data.firstRegistrationDate,
      isFirstOwner: data.isFirstOwner,
      servicedInASO: data.servicedInASO,
      isNew: data.isNew,
      canNegotiate: data.canNegotiate,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  if (data.comfortList && data.comfortList.length > 0) {
    await db.comfortList.createMany({
      data: data.comfortList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  if (data.safetyList && data.safetyList.length > 0) {
    await db.safetyList.createMany({
      data: data.safetyList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  if (data.audioAndMultimediaList && data.audioAndMultimediaList.length > 0) {
    await db.audioAndMultimediaList.createMany({
      data: data.audioAndMultimediaList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  if (data.otherList && data.otherList.length > 0) {
    await db.otherList.createMany({
      data: data.otherList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  revalidatePath("/");
  revalidatePath("/cars");

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

  if (data.comfortList) {
    await db.comfortList.deleteMany({ where: { carId: car.id } });
    await db.comfortList.createMany({
      data: data.comfortList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  if (data.safetyList) {
    await db.safetyList.deleteMany({ where: { carId: car.id } });
    await db.safetyList.createMany({
      data: data.safetyList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  if (data.audioAndMultimediaList) {
    await db.audioAndMultimediaList.deleteMany({ where: { carId: car.id } });
    await db.audioAndMultimediaList.createMany({
      data: data.audioAndMultimediaList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  if (data.otherList) {
    await db.otherList.deleteMany({ where: { carId: car.id } });
    await db.otherList.createMany({
      data: data.otherList.map((name) => ({
        name,
        carId: car.id,
      })),
    });
  }

  revalidatePath("/");
  revalidatePath("/cars");

  redirect("/admin/cars");
}

export async function toggleCarAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await db.car.update({ where: { id }, data: { isAvailableForPurchase } });

  revalidatePath("/");
  revalidatePath("/cars");
}

export async function deleteCar(id: string) {
  const car = await db.car.delete({ where: { id } });
  if (car == null) return notFound();

  await fs.unlink(car.filePath);
  await fs.unlink(`public${car.imagePath}`);
  await db.comfortList.deleteMany({ where: { carId: id } });
  await db.safetyList.deleteMany({ where: { carId: id } });
  await db.audioAndMultimediaList.deleteMany({ where: { carId: id } });
  await db.otherList.deleteMany({ where: { carId: id } });

  revalidatePath("/");
  revalidatePath("/cars");
}
