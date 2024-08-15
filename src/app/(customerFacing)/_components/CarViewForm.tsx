"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { ComfortList,SafetyList,AudioAndMultimediaList,OtherList, Car as PrismaCar } from "@prisma/client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import PersonIcon from "@mui/icons-material/Person";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InfoIcon from "@mui/icons-material/Info";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface CarWithAdditionalLists extends PrismaCar {
  comfortList?: ComfortList[];
  safetyList?: SafetyList[];
  audioAndMultimediaList?: AudioAndMultimediaList[];
  otherList?: OtherList[];
}
export function CarViewForm({ car }: { car?: CarWithAdditionalLists | null }) {
  const [priceInCents] = useState<number | undefined>(car?.priceInCents);

  console.log(car);

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cars">Cars</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cars">{car?.brand}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage> {car?.model}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:space-x-6">
        <Carousel className="w-full max-w-2xl md:max-w-4xl">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      {car != null && (
                        <Image
                          src={car.imagePath}
                          height="1200"
                          width="1200"
                          alt="Car Image"
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="mx-20" />
          <CarouselNext className="mx-20" />
          <div className="flex space-x-4 mt-4">
            <p>
              {car?.createdAt
                ? new Date(car.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                : ""}
            </p>
            <p>ID: {car?.id.split("-")[4] || "No ID available"}</p>
          </div>
        </Carousel>

        <div className="space-y-2 text-start md:max-w-sm">
          <h1 className="font-bold text-xl">{car?.name}</h1>
          <p className="text-gray-500">
            {car?.isNew} · {car?.year}
          </p>
          <p className="font-bold text-xl">
            {formatCurrency((priceInCents || 0) / 100)}
          </p>
          <p className="text-gray-500">
            {" "}
            {car?.canNegotiate === "Yes"
              ? "Negotiable"
              : car?.canNegotiate === "No"
              ? "Not Negotiable"
              : ""}
          </p>
          <div className="space-y-2 py-14">
            <Card>
              <CardHeader>
                <CardTitle>Łukasz</CardTitle>
                <CardDescription>
                  <CheckCircleOutlineIcon /> Osoba prywatna
                </CardDescription>
                <CardDescription>
                  <PersonIcon />
                  Sprzedający na MotoTrade od 2020
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4">
                  <MailIcon className="mr-2" />
                  Kontakt ze sprzedającym
                </Button>
                <Button className="w-full">
                  <LocalPhoneIcon className="mr-2" />
                  Wyświetl numer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="border-t border-gray-300 my-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Most important</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
              >
                <path
                  d="m16.474 4 5.897 16.083h-2.13L14.343 4h2.13zm-6.446 0L4.13 20.083H2L7.898 4h2.13zm2.982 11v4h-2v-4h2zm0-4.958v3h-2v-3h2zm0-4.042v2h-2V6h2z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <p className="text-sm text-gray-500 mt-2">Mileage</p>
              <p className="text-lg font-bold">
                {car?.mileage !== undefined
                  ? new Intl.NumberFormat("pl-PL").format(car.mileage)
                  : "0"}{" "}
                km
              </p>
            </div>
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
              >
                <path
                  d="m13 2 1 1v7h1c1.206 0 3 .799 3 3v6c.012.449.195 1 1 1 .806 0 .988-.55 1-1.011V6.42l-1.408-1.38H16L15 4l1-.96h3.408L22 5.58V19c0 1.206-.799 3-3 3-2.2 0-3-1.794-3-3v-6c0-.806-.55-.99-1.011-1H14v10H3V3l1-1h9zm-1 2H5v16h7V4zm-1.003 1v4H6V5h4.997z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <p className="text-sm text-gray-500 mt-2">Fuel type</p>
              <p className="text-lg font-bold">{car?.fuelType}</p>
            </div>
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
              >
                <path
                  d="M21 5a2 2 0 0 0-4 0c0 .738.405 1.376 1 1.723v3.863l-.414.414H13V6.745A1.991 1.991 0 0 0 14.042 5a2 2 0 0 0-4 0c0 .721.385 1.348.958 1.7V11H6V6.723A1.994 1.994 0 0 0 5 3a1.994 1.994 0 0 0-1 3.723v10.554c-.595.347-1 .984-1 1.723a2 2 0 0 0 4 0c0-.739-.405-1.376-1-1.723V13h5v4.3a1.99 1.99 0 0 0-.958 1.7 2 2 0 0 0 4 0A1.99 1.99 0 0 0 13 17.255V13h5.414L20 11.414v-4.69c.595-.348 1-.986 1-1.724"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <p className="text-sm text-gray-500 mt-2">Gearbox type</p>
              <p className="text-lg font-bold">{car?.gearboxType}</p>
            </div>
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
              >
                <g fill="#020309" fillRule="evenodd">
                  <path d="M6.958 19.959a1 1 0 1 1 .001-2 1 1 0 0 1 0 2m0-4a3 3 0 1 0-.001 6 3 3 0 0 0 0-6M16.958 19.959a1.001 1.001 0 0 1 0-2 1 1 0 0 1 0 2m0-4a3 3 0 1 0 0 6 3 3 0 0 0 0-6M20 12.958h-.225a2.993 2.993 0 0 0-2.817-2 2.993 2.993 0 0 0-2.816 2H9.774a2.99 2.99 0 0 0-2.816-2 2.992 2.992 0 0 0-2.816 2H4V7.627L6.734 4h7.572l.72 3.288.28 1.672H20v3.998Zm1-5.998h-4L16 2H5.764L2 6.96v6.998l1 1h2.958v-1a1.001 1.001 0 0 1 2 0v1h8v-1a1.001 1.001 0 0 1 2 0v1H21l1-1V7.96l-1-1Z"></path>
                </g>
              </svg>
              <p className="text-sm text-gray-500 mt-2">Body type</p>
              <p className="text-lg font-bold">{car?.bodyType}</p>
            </div>
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
              >
                <path
                  d="M17 18h-4.17l-1.415-1.414L10.83 16H7v-6h10v8zm5-9-1 1v2.042h-2V9l-1-1h-5V6h2.5l1-1-1-1h-7l-1 1 1 1H11v2H6L5 9v3H3v-2L2 9l-1 1v6l1 1 1-1v-2h2v3l1 1h4l2 2h6l1-1v-5h2v2l1 1 1-1v-6l-1-1z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <p className="text-sm text-gray-500 mt-2">Engine displacement</p>
              <p className="text-lg font-bold">{car?.engineDisplacement} cm3</p>
            </div>
            <div>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
              >
                <g fill="#000" fillRule="evenodd">
                  <path d="m12.87 9.009 1.602-3.313h-2.759L9.641 10.08h1.398l-1.466 3.873 5.33-4.944zM6.5 13a1.5 1.5 0 1 0-.001 2.999A1.5 1.5 0 0 0 6.5 13M17.5 13a1.5 1.5 0 1 0-.001 2.999A1.5 1.5 0 0 0 17.5 13"></path>
                  <path d="M21 17H3v-3.586l2.385-2.386h.014l.551-.547.205-1.453h-.006L6.867 4h10.266l.929 6.466.552.562L21 13.414V17Zm1.707-4.707-2.764-2.764-.953-6.671L18 2H6l-.99.858-.953 6.671-2.764 2.764L1 13v5l1 1h1v3h2v-3h14v3h2v-3h1l1-1v-5l-.293-.707Z"></path>
                </g>
              </svg>
              <p className="text-sm text-gray-500 mt-2">Horse power</p>
              <p className="text-lg font-bold">{car?.horsePower} HP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="border-t border-gray-300 my-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <span className="h-8 w-8 mx-auto">{car?.description}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="border-t border-gray-300 my-4 py-4">
          <h2 className="text-2xl font-bold mb-4">Details</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-semibold text-black">
                  <InfoIcon className="mr-2" />
                  Basic informations
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Production year</TableCell>
                <TableCell>{car?.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Model</TableCell>
                <TableCell>{car?.model}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Version</TableCell>
                <TableCell>{car?.version}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Generation</TableCell>
                <TableCell>{car?.generation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Doors amount</TableCell>
                <TableCell>{car?.doorsAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Seats amount</TableCell>
                <TableCell>{car?.seatsAmount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Color</TableCell>
                <TableCell>{car?.color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">VIN</TableCell>
                <TableCell>{car?.VIN}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-black">
                <div className="flex">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mx-auto"
                  >
                    <path
                      fill="currentColor"
                      d="M6 4H4v2H2V2h4v2ZM18.001 2v2h2v2h2V2h-4Z"
                    ></path>
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M16.858 13h1.887v-2h-1.888a4.983 4.983 0 0 0-.731-1.754l1.339-1.338-1.414-1.414-1.331 1.331a5.019 5.019 0 0 0-1.761-.742v-1.87h-2v1.86a5.012 5.012 0 0 0-1.782.731l-1.31-1.31-1.414 1.414 1.299 1.3A5.015 5.015 0 0 0 7 11H5.172v2h1.827c.132.653.39 1.261.749 1.796l-1.295 1.296 1.414 1.414 1.302-1.303a4.978 4.978 0 0 0 1.79.735v1.848h2V16.93a5.01 5.01 0 0 0 1.768-.747l1.324 1.324 1.414-1.414-1.334-1.334A5.01 5.01 0 0 0 16.858 13Zm-4.93 2.036a3.033 3.033 0 0 1-3.03-3.03 3.034 3.034 0 0 1 3.03-3.03c1.67 0 3.03 1.36 3.03 3.03 0 1.671-1.36 3.03-3.03 3.03Z"
                      clipRule="evenodd"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M4 18H2v4h4v-2H4v-2ZM18.001 20h2v-2h2v4h-4v-2Z"
                    ></path>
                  </svg>
                  <p className="pl-2">Specification</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Drivetrain</TableCell>
                      <TableCell>{car?.drivetrain}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Engine Displacement
                      </TableCell>
                      <TableCell>{car?.engineDisplacement} cm3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Horse power</TableCell>
                      <TableCell>{car?.horsePower} KM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Gearbox type
                      </TableCell>
                      <TableCell>{car?.gearboxType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fuel type</TableCell>
                      <TableCell>{car?.fuelType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        CO2 emission
                      </TableCell>
                      <TableCell>{car?.CO2Emission} g/km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        City fuel consumption
                      </TableCell>
                      <TableCell>{car?.cityFuelConsumption} l/100km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Out of city zone fuel consumption
                      </TableCell>
                      <TableCell>
                        {car?.outOfCityFuelConsumption} l/100km
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Body type</TableCell>
                      <TableCell>{car?.bodyType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Color type</TableCell>
                      <TableCell>{car?.colorType}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-black">
                <div className="flex">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mx-auto"
                  >
                    <path
                      d="M11.001 3v2H6.867l-.719 5.028h4.849v2H5.385l-2.386 2.386V18h18v-1h2v2l-1 1h-1v3H19v-3H4.999v3h-2v-3h-1L1 19v-5l.293-.708 2.764-2.763.952-6.67L6 3h5.001zM6.5 14a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM22 2l1 1v11l-1 1h-8l-1-1V3l1-1h8zm-1 2h-6v9h6V4zm-.996 6v1H18v-1h2.004zm-3 0v1H16v-1h1.004zm3-2v1H18V8h2.004zm-3 0v1H16V8h1.004zm3-2v1H18V6h2.004zm-3 0v1H16V6h1.004z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <p className="pl-2">Condition and history</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Condition</TableCell>
                      <TableCell>{car?.isNew}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mileage</TableCell>
                      <TableCell>{car?.mileage} km</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Country of origin
                      </TableCell>
                      <TableCell>{car?.countryOfOrigin}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Has a registration number
                      </TableCell>
                      <TableCell>{car?.hasRegistrationNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Registered in Poland
                      </TableCell>
                      <TableCell>{car?.registeredInPoland}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Driver plate number
                      </TableCell>
                      <TableCell>{car?.driverPlateNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        First registration Date
                      </TableCell>
                      <TableCell>{car?.firstRegistrationDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">First owner</TableCell>
                      <TableCell>{car?.isFirstOwner}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Serviced in ASO
                      </TableCell>
                      <TableCell>{car?.servicedInASO}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-black">
                <div className="flex">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mx-auto"
                  >
                    <path
                      d="M7.773 20.553v-2.371c2.166.343 3.971.37 4.444.37h.118a35 35 0 0 0 4.539-.408v2.409H7.773ZM11.87 4.015a7.24 7.24 0 0 1 .908 0c1.489.1 4.096.83 4.096 1.538v2.785c-2.506-.782-4.487-.742-4.565-.742-.095.002-2.119.048-4.536.768V5.553c0-.763 2.607-1.437 4.097-1.538Zm-4.097 6.452c2.384-.811 4.551-.871 4.581-.871.019-.004 2.077-.035 4.52.85v5.67a33.377 33.377 0 0 1-4.561.436c-.031-.002-2.102.017-4.54-.4v-5.685ZM18.874 9.07V5.553l-.002-.073h-.006c-.049-1.608-1.586-2.493-2.992-2.927 0 0-1.141-.421-3.028-.54h-.002a9.513 9.513 0 0 0-1.041 0h-.002c-1.886.119-3.028.54-3.028.54-1.405.434-2.943 1.319-2.991 2.927h-.006c0 .025-.003.048-.003.073V9.07L2 12.846l.707.707h1.414L5.773 11.9v9.653l.5.5.5.5h11.101l.5-.5.5-.5V11.9l1.653 1.653h1.414l.707-.707-3.774-3.775Z"
                      fill="#020309"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <p className="pl-2">Comfort</p>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <Table>
                  <TableBody>
                    {car?.comfortList?.length ? (
                      car.comfortList.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell className="font-medium">
                            {option.name}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="font-medium">
                          No comfort options added
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-black">
                <div className="flex">
                  <HealthAndSafetyIcon /> <p className="pl-2">Safety</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {car?.safetyList?.length ? (
                      car.safetyList.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell className="font-medium">
                            {option.name}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="font-medium">
                          No safety options added
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold text-black">
                <div className="flex">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mx-auto"
                  >
                    <g fill="#020309" fillRule="evenodd">
                      <path d="M12 18c-3.308 0-6-2.691-6-6s2.692-6 6-6c3.309 0 6 2.691 6 6s-2.691 6-6 6m0-14a8 8 0 1 0 0 16 8 8 0 0 0 0-16"></path>
                      <path d="M12 10a2 2 0 1 0 .001 4.001A2 2 0 0 0 12 10M20 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M4 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2M4 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path>
                    </g>
                  </svg>
                  <p className="pl-2">Audio and multimedia</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {car?.audioAndMultimediaList?.length ? (
                      car.audioAndMultimediaList.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell className="font-medium">
                            {option.name}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="font-medium">
                          No audio and multimedia options added
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-semibold text-black">
                <div className="flex">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mx-auto"
                  >
                    <path
                      d="M12 2a8 8 0 0 1 8 8 7.98 7.98 0 0 1-3 6.239v5.189l-1.354.935L12.043 21l-3.702 1.375-1.348-.938v-5.203A7.978 7.978 0 0 1 4 10a8 8 0 0 1 8-8zM8.993 17.411v2.588l3.057-1.135L15 19.98v-2.567a7.96 7.96 0 0 1-6.007-.002zM12 4c-3.309 0-6 2.692-6 6 0 3.309 2.691 6 6 6 3.308 0 6-2.691 6-6 0-3.308-2.692-6-6-6zm.041 2.05 1.223 2.477L16 8.925l-1.979 1.93.468 2.723-2.447-1.286-2.446 1.286.467-2.724-1.979-1.929 2.735-.398 1.223-2.478z"
                      fill="currentColor"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  <p className="pl-2">Other</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {car?.otherList?.length ? (
                      car.otherList.map((option) => (
                        <TableRow key={option.id}>
                          <TableCell className="font-medium">
                            {option.name}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="font-medium">
                          No other options added
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
