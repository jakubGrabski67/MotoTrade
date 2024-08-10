"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addCar } from "../../_actions/cars";
import { useFormState, useFormStatus } from "react-dom";

export function CarForm() {
  const [error, action] = useFormState(addCar, {});
  const [priceInCents, setPriceInCents] = useState<number>();

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
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
        <Input type="text" id="brand" name="brand" required />
        {error.brand && <div className="text-destructive">{error.brand}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input type="text" id="model" name="model" required />
        {error.model && <div className="text-destructive">{error.model}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="year">Year</Label>
        <Input type="text" id="year" name="year" required />
        {error.year && <div className="text-destructive">{error.year}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="mileage">Mileage</Label>
        <Input type="text" id="mileage" name="mileage" required />
        {error.mileage && (
          <div className="text-destructive">{error.mileage}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="fuelType">Fuel Type</Label>
        <Input type="text" id="fuelType" name="fuelType" required />
        {error.fuelType && (
          <div className="text-destructive">{error.fuelType}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required />
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required />
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

//1:04:06