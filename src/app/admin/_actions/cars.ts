"use server";

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

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
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
  comfortList: z.array(z.string().min(1)),
  safetyList: z.array(z.string().min(1)),
  audioAndMultimediaList: z.array(z.string().min(1)),
  otherList: z.array(z.string().min(1)),
});

export async function addCar(prevState: unknown, formData: FormData) {
  type ParsedData = {
    [key: string]: string | File | undefined;
    comfortList?: string;
    safetyList?: string;
    audioAndMultimediaList?: string;
    otherList?: string;
    file?: File;
    image?: File;
  };

  const parsedData: ParsedData = Object.fromEntries(formData.entries());

  let comfortList: string[] = [];
  let safetyList: string[] = [];
  let audioAndMultimediaList: string[] = [];
  let otherList: string[] = [];

  if (parsedData.comfortList && typeof parsedData.comfortList === "string") {
    try {
      comfortList = JSON.parse(parsedData.comfortList) as string[];
    } catch (error) {
      return { comfortList: ["Invalid JSON format"] };
    }
  }

  if (parsedData.safetyList && typeof parsedData.safetyList === "string") {
    try {
      safetyList = JSON.parse(parsedData.safetyList) as string[];
    } catch (error) {
      return { safetyList: ["Invalid JSON format"] };
    }
  }

  if (
    parsedData.audioAndMultimediaList &&
    typeof parsedData.audioAndMultimediaList === "string"
  ) {
    try {
      audioAndMultimediaList = JSON.parse(
        parsedData.audioAndMultimediaList
      ) as string[];
    } catch (error) {
      return { audioAndMultimediaList: ["Invalid JSON format"] };
    }
  }

  if (parsedData.otherList && typeof parsedData.otherList === "string") {
    try {
      otherList = JSON.parse(parsedData.otherList) as string[];
    } catch (error) {
      return { otherList: ["Invalid JSON format"] };
    }
  }

  const result = addSchema.safeParse({
    ...parsedData,
    comfortList,
    safetyList,
    audioAndMultimediaList,
    otherList,
  });

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("cars", { recursive: true });
  const filePath = `cars/${crypto.randomUUID()}-${data.file?.name}`;
  if (data.file) {
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  await fs.mkdir("public/cars", { recursive: true });
  const imagePath = `/cars/${crypto.randomUUID()}-${data.image?.name}`;
  if (data.image) {
    await fs.writeFile(
      `public/${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.car.create({
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
      comfortList: {
        create: data.comfortList.map((option) => ({ optionName: option })),
      },
      safetyList: {
        create: data.safetyList.map((option) => ({ optionName: option })),
      },
      audioAndMultimediaList: {
        create: data.audioAndMultimediaList.map((option) => ({
          optionName: option,
        })),
      },
      otherList: {
        create: data.otherList.map((option) => ({ optionName: option })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/cars");

  redirect("/admin/cars");
}

const prisma = new PrismaClient();

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

export async function updateCar(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  type ParsedData = {
    [key: string]: string | File | undefined;
    comfortList?: string;
    safetyList?: string;
    audioAndMultimediaList?: string;
    otherList?: string;
    file?: File;
    image?: File;
  };

  const parsedData: ParsedData = Object.fromEntries(formData.entries());

  let comfortList: string[] = [];
  let safetyList: string[] = [];
  let audioAndMultimediaList: string[] = [];
  let otherList: string[] = [];

  if (typeof parsedData.comfortList === "string") {
    try {
      comfortList = JSON.parse(parsedData.comfortList) as string[];
    } catch (error) {
      return { comfortList: ["Invalid JSON format"] };
    }
  }

  if (typeof parsedData.safetyList === "string") {
    try {
      safetyList = JSON.parse(parsedData.safetyList) as string[];
    } catch (error) {
      return { safetyList: ["Invalid JSON format"] };
    }
  }

  if (typeof parsedData.audioAndMultimediaList === "string") {
    try {
      audioAndMultimediaList = JSON.parse(
        parsedData.audioAndMultimediaList
      ) as string[];
    } catch (error) {
      return { audioAndMultimediaList: ["Invalid JSON format"] };
    }
  }

  if (typeof parsedData.otherList === "string") {
    try {
      otherList = JSON.parse(parsedData.otherList) as string[];
    } catch (error) {
      return { otherList: ["Invalid JSON format"] };
    }
  }

  const result = editSchema.safeParse({
    ...parsedData,
    comfortList,
    safetyList,
    audioAndMultimediaList,
    otherList,
  });

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const car = await prisma.car.findUnique({
    where: { id },
    include: {
      comfortList: true,
      safetyList: true,
      audioAndMultimediaList: true,
      otherList: true,
    },
  });

  if (!car) return notFound();

  let filePath = car.filePath;
  if (data.file && data.file.size > 0) {
    await fs.unlink(car.filePath);
    filePath = `cars/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = car.imagePath;
  if (data.image && data.image.size > 0) {
    await fs.unlink(`public${car.imagePath}`);
    imagePath = `/cars/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public/${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await prisma.car.update({
    where: { id },
    data: {
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
      comfortList: {
        deleteMany: {},
        create: data.comfortList.map((option: string) => ({
          optionName: option,
        })),
      },
      safetyList: {
        deleteMany: {},
        create: data.safetyList.map((option: string) => ({
          optionName: option,
        })),
      },
      audioAndMultimediaList: {
        deleteMany: {},
        create: data.audioAndMultimediaList.map((option: string) => ({
          optionName: option,
        })),
      },
      otherList: {
        deleteMany: {},
        create: data.otherList.map((option: string) => ({
          optionName: option,
        })),
      },
    },
  });

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

  revalidatePath("/");
  revalidatePath("/cars");
}
