"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addCar, updateCar } from "../../_actions/cars";
import { useFormState, useFormStatus } from "react-dom";
import { Car } from "@prisma/client";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CarForm({ car }: { car?: Car | null }) {
  const [error, action] = useFormState(
    car == null ? addCar : updateCar.bind(null, car.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    car?.priceInCents
  );
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    car?.brand
  );

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={car?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Select
          name="brand"
          required
          value={selectedBrand}
          onValueChange={handleBrandChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a car brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Most popular</SelectLabel>
              <SelectItem value="BMW">BMW</SelectItem>
              <SelectItem value="Audi">Audi</SelectItem>
              <SelectItem value="Volkswagen">Volkswagen</SelectItem>
              <SelectItem value="Ford">Ford</SelectItem>
              <SelectItem value="Mercedes-Benz">Mercedes-Benz</SelectItem>
              <SelectItem value="Opel">Opel</SelectItem>
              <SelectItem value="Toyota">Toyota</SelectItem>
              <SelectItem value="Skoda">Skoda</SelectItem>
              <SelectItem value="Renault">Renault</SelectItem>
              <SelectItem value="Peugeot">Peugeot</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Alphabetical</SelectLabel>
              <SelectItem value="art">Argentina Time (ART)</SelectItem>
              <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
              <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
              <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {error.brand && <div className="text-destructive">{error.brand}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input
          type="text"
          id="model"
          name="model"
          required
          defaultValue={car?.model || ""}
        />
        {error.model && <div className="text-destructive">{error.model}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input
          type="text"
          id="year"
          name="year"
          required
          defaultValue={car?.year || ""}
        />
        {error.year && <div className="text-destructive">{error.year}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="mileage">Mileage</Label>
        <Input
          type="text"
          id="mileage"
          name="mileage"
          required
          defaultValue={car?.mileage || ""}
        />
        {error.mileage && (
          <div className="text-destructive">{error.mileage}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="fuelType">Fuel Type</Label>
        <Input
          type="text"
          id="fuelType"
          name="fuelType"
          required
          defaultValue={car?.fuelType || ""}
        />
        {error.fuelType && (
          <div className="text-destructive">{error.fuelType}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={car?.description || ""}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={car == null} />
        {car != null && (
          <div className="text-muted-foreground">{car.filePath}</div>
        )}
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={car == null} />
        {car != null && (
          <Image src={car.imagePath} height="400" width="400" alt="Car Image" />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
