"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { useEffect, useState } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface ComfortItem {
  id: number;
  optionName: string;
  carId: string;
}

interface SafetyItem {
  id: number;
  optionName: string;
  carId: string;
}

interface AudioAndMultimediaItem {
  id: number;
  optionName: string;
  carId: string;
}

interface OtherItem {
  id: number;
  optionName: string;
  carId: string;
}

type ComfortList = ComfortItem[];
type SafetyList = SafetyItem[];
type AudioAndMultimediaList = AudioAndMultimediaItem[];
type OtherList = OtherItem[];

interface CarFormProps {
  car?: Car | null;
  comfortList?: ComfortList | null;
  safetyList?: SafetyList | null;
  audioAndMultimediaList?: AudioAndMultimediaList | null;
  otherList?: OtherList | null;
}

export function CarForm({
  car,
  comfortList,
  safetyList,
  audioAndMultimediaList,
  otherList,
}: CarFormProps) {
  const [selectedComfortList, setSelectedComfortList] = useState<string[]>(
    car?.id && Array.isArray(comfortList)
      ? comfortList
          .filter((option) => option.carId === car.id)
          .map((option) => option.optionName)
      : []
  );

  const [selectedSafetyList, setSelectedSafetyList] = useState<string[]>(
    car?.id && Array.isArray(safetyList)
      ? safetyList
          .filter((option) => option.carId === car.id)
          .map((option) => option.optionName)
      : []
  );

  const [selectedAudioAndMultimediaList, setSelectedAudioAndMultimediaList] =
    useState<string[]>(
      car?.id && Array.isArray(audioAndMultimediaList)
        ? audioAndMultimediaList
            .filter((option) => option.carId === car.id)
            .map((option) => option.optionName)
        : []
    );

  const [selectedOtherList, setSelectedOtherList] = useState<string[]>(
    car?.id && Array.isArray(otherList)
      ? otherList
          .filter((option) => option.carId === car.id)
          .map((option) => option.optionName)
      : []
  );

  const [error, action] = useFormState(
    car == null ? addCar : updateCar.bind(null, car.id),
    {
      comfortList: selectedComfortList,
      safetyList: selectedSafetyList,
      audioAndMultimediaList: selectedAudioAndMultimediaList,
      otherList: selectedOtherList,
    }
  );

  const availableComfortOptions = Array.isArray(comfortList)
    ? comfortList.map((item) => item.optionName)
    : [];

  const availableSafetyOptions = Array.isArray(safetyList)
    ? safetyList.map((item) => item.optionName)
    : [];

  const availableAudioAndMultimediaOptions = Array.isArray(
    audioAndMultimediaList
  )
    ? audioAndMultimediaList.map((item) => item.optionName)
    : [];

  const availableOtherOptions = Array.isArray(otherList)
    ? otherList.map((item) => item.optionName)
    : [];

  const [comfortListOptions, setComfortListOptions] = useState(
    Array.from(new Set(availableComfortOptions)).map((optionName) => ({
      value: optionName,
      label: optionName,
    }))
  );

  const [safetyListOptions, setSafetyListOptions] = useState(
    Array.from(new Set(availableSafetyOptions)).map((optionName) => ({
      value: optionName,
      label: optionName,
    }))
  );

  const [audioAndMultimediaListOptions, setAudioAndMultimediaListOptions] =
    useState(
      Array.from(new Set(availableAudioAndMultimediaOptions)).map(
        (optionName) => ({
          value: optionName,
          label: optionName,
        })
      )
    );

  const [otherListOptions, setOtherListOptions] = useState(
    Array.from(new Set(availableOtherOptions)).map((optionName) => ({
      value: optionName,
      label: optionName,
    }))
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleComfortListChange = (option: string) => {
    setSelectedComfortList((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSafetyListChange = (option: string) => {
    setSelectedSafetyList((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleAudioAndMultimediaListChange = (option: string) => {
    setSelectedAudioAndMultimediaList((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleOtherListChange = (option: string) => {
    setSelectedOtherList((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleAddNewComfortListOption = (newOption: string) => {
    const newOptionObject = { value: newOption, label: newOption };
    setComfortListOptions((prev) => [...prev, newOptionObject]);
    handleComfortListChange(newOption);
    setSearchTerm("");
  };

  const handleAddNewSafetyListOption = (newOption: string) => {
    const newOptionObject = { value: newOption, label: newOption };
    setSafetyListOptions((prev) => [...prev, newOptionObject]);
    handleSafetyListChange(newOption);
    setSearchTerm("");
  };

  const handleAddNewAudioAndMultimediaOption = (newOption: string) => {
    const newOptionObject = { value: newOption, label: newOption };
    setAudioAndMultimediaListOptions((prev) => [...prev, newOptionObject]);
    handleAudioAndMultimediaListChange(newOption);
    setSearchTerm("");
  };

  const handleAddNewOtherListOption = (newOption: string) => {
    const newOptionObject = { value: newOption, label: newOption };
    setOtherListOptions((prev) => [...prev, newOptionObject]);
    handleOtherListChange(newOption);
    setSearchTerm("");
  };

  const filteredComfortListOptions = comfortListOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSafetyListOptions = safetyListOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAudioAndMultimediaListOptions =
    audioAndMultimediaListOptions.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredOtherListOptions = otherListOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [comfortListOpen, setComfortListOpen] = React.useState(false);
  const [safetyListOpen, setSafetyListOpen] = React.useState(false);
  const [audioAndMultimediaListOpen, setAudioAndMultimediaListOpen] =
    React.useState(false);
  const [otherListOpen, setOtherListOpen] = React.useState(false);

  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    car?.priceInCents
  );
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    car?.brand
  );

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
  };

  const [selectedVehicleCondition, setSelectedVehicleCondition] = useState<
    string | undefined
  >(car?.isNew);

  const handleVehicleConditionChange = (value: string) => {
    setSelectedVehicleCondition(value);
  };

  const [selectedCanNegotiate, setSelectedCanNegotiate] = useState<
    string | undefined
  >(car?.canNegotiate);

  const handleCanNegotiateChange = (value: string) => {
    setSelectedCanNegotiate(value);
  };

  const [selectedFuelType, setSelectedFuelType] = useState<string | undefined>(
    car?.fuelType
  );

  const handleFuelTypeChange = (value: string) => {
    setSelectedFuelType(value);
  };

  const [selectedGearboxType, setSelectedGearboxType] = useState<
    string | undefined
  >(car?.gearboxType);

  const handleGearboxTypeChange = (value: string) => {
    setSelectedGearboxType(value);
  };

  const [selectedBodyType, setSelectedBodyType] = useState<string | undefined>(
    car?.bodyType
  );

  const handleBodyTypeChange = (value: string) => {
    setSelectedBodyType(value);
  };

  const [selectedColorType, setSelectedColorType] = useState<
    string | undefined
  >(car?.colorType);

  const handleColorTypeChange = (value: string) => {
    setSelectedColorType(value);
  };

  const [selectedDrivetrain, setSelectedDrivetrain] = useState<
    string | undefined
  >(car?.drivetrain);

  const handleDrivetrainChange = (value: string) => {
    setSelectedDrivetrain(value);
  };

  const [selectedHasRegistrationNumber, setSelectedHasRegistrationNumber] =
    useState<string | undefined>(car?.hasRegistrationNumber);

  const handleHasRegistrationNumberChange = (value: string) => {
    setSelectedHasRegistrationNumber(value);
  };

  const [selectedRegisteredInPoland, setSelectedRegisteredInPoland] = useState<
    string | undefined
  >(car?.registeredInPoland);

  const handleRegisteredInPolandChange = (value: string) => {
    setSelectedRegisteredInPoland(value);
  };

  const [selectedIsFirstOwner, setSelectedIsFirstOwner] = useState<
    string | undefined
  >(car?.isFirstOwner);

  const handleIsFirstOwnerChange = (value: string) => {
    setSelectedIsFirstOwner(value);
  };

  const [selectedServicedInASO, setSelectedServicedInASO] = useState<
    string | undefined
  >(car?.servicedInASO);

  const handleServicedInASOChange = (value: string) => {
    setSelectedServicedInASO(value);
  };

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [firstRegistrationDate, setFirstRegistrationDate] = useState("");
  useEffect(() => {
    if (car?.firstRegistrationDate) {
      const date = new Date(car.firstRegistrationDate);
      setYear(date.getFullYear().toString());
      setMonth((date.getMonth() + 1).toString());
      setDay(date.getDate().toString());
      setFirstRegistrationDate(car.firstRegistrationDate);
    }
  }, [car]);
  useEffect(() => {
    if (year && month && day) {
      setFirstRegistrationDate(
        `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(
          2,
          "0"
        )}`
      );
    }
  }, [year, month, day]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("comfortList", JSON.stringify(selectedComfortList));

    formData.append("safetyList", JSON.stringify(selectedSafetyList));

    formData.append(
      "audioAndMultimediaList",
      JSON.stringify(selectedAudioAndMultimediaList)
    );

    formData.append("otherList", JSON.stringify(selectedOtherList));

    console.log("FormData before sending:", Array.from(formData.entries()));

    const errors = await action(formData);
    if (errors !== null) {
      console.error("Errors: ", errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="comfortList">Comfort options</Label>
        <Popover open={comfortListOpen} onOpenChange={setComfortListOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={comfortListOpen}
              className="w-full justify-between"
            >
              {selectedComfortList.length > 0
                ? selectedComfortList.join(", ")
                : "Select comfort options..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search comfort options..."
                value={searchTerm}
                onValueChange={(value) => setSearchTerm(value)}
              />
              <CommandList>
                {filteredComfortListOptions.length > 0 ? (
                  <CommandGroup>
                    {filteredComfortListOptions.map((optionName) => (
                      <CommandItem
                        key={optionName.value}
                        value={optionName.value}
                        onSelect={() => {
                          handleComfortListChange(optionName.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedComfortList.includes(optionName.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {optionName.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>
                    No comfort option found. Start typing to add a new option.
                  </CommandEmpty>
                )}
              </CommandList>
              {filteredComfortListOptions.length === 0 && searchTerm && (
                <div className="p-2">
                  <Button
                    onClick={() => handleAddNewComfortListOption(searchTerm)}
                  >
                    Add "{searchTerm}" as a new option
                  </Button>
                </div>
              )}
            </Command>
          </PopoverContent>
        </Popover>
        {/* {error.comfortList && <div className="text-destructive">{error.comfortList}</div>} */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="safetyList">Safety options</Label>
        <Popover open={safetyListOpen} onOpenChange={setSafetyListOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={safetyListOpen}
              className="w-full justify-between"
            >
              {selectedSafetyList.length > 0
                ? selectedSafetyList.join(", ")
                : "Select safety options..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search safety options..."
                value={searchTerm}
                onValueChange={(value) => setSearchTerm(value)}
              />
              <CommandList>
                {filteredSafetyListOptions.length > 0 ? (
                  <CommandGroup>
                    {filteredSafetyListOptions.map((optionName) => (
                      <CommandItem
                        key={optionName.value}
                        value={optionName.value}
                        onSelect={() => {
                          handleSafetyListChange(optionName.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedSafetyList.includes(optionName.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {optionName.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>
                    No safety option found. Start typing to add a new option.
                  </CommandEmpty>
                )}
              </CommandList>
              {filteredSafetyListOptions.length === 0 && searchTerm && (
                <div className="p-2">
                  <Button
                    onClick={() => handleAddNewSafetyListOption(searchTerm)}
                  >
                    Add "{searchTerm}" as a new option
                  </Button>
                </div>
              )}
            </Command>
          </PopoverContent>
        </Popover>
        {/* {error.safetyList && <div className="text-destructive">{error.safetyList}</div>} */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="audioAndMultimediaList">
          Audio and multimedia options
        </Label>
        <Popover
          open={audioAndMultimediaListOpen}
          onOpenChange={setAudioAndMultimediaListOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={audioAndMultimediaListOpen}
              className="w-full justify-between"
            >
              {selectedAudioAndMultimediaList.length > 0
                ? selectedAudioAndMultimediaList.join(", ")
                : "Select audio and multimedia options..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search audio and multimedia options..."
                value={searchTerm}
                onValueChange={(value) => setSearchTerm(value)}
              />
              <CommandList>
                {filteredAudioAndMultimediaListOptions.length > 0 ? (
                  <CommandGroup>
                    {filteredAudioAndMultimediaListOptions.map((optionName) => (
                      <CommandItem
                        key={optionName.value}
                        value={optionName.value}
                        onSelect={() => {
                          handleAudioAndMultimediaListChange(optionName.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedAudioAndMultimediaList.includes(
                              optionName.value
                            )
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {optionName.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>
                    No audio and multimedia option found. Start typing to add a
                    new option.
                  </CommandEmpty>
                )}
              </CommandList>
              {filteredAudioAndMultimediaListOptions.length === 0 &&
                searchTerm && (
                  <div className="p-2">
                    <Button
                      onClick={() =>
                        handleAddNewAudioAndMultimediaOption(searchTerm)
                      }
                    >
                      Add "{searchTerm}" as a new option
                    </Button>
                  </div>
                )}
            </Command>
          </PopoverContent>
        </Popover>
        {/* {error.audioAndMultimediaList && <div className="text-destructive">{error.audioAndMultimediaList}</div>} */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="otherList">Other options</Label>
        <Popover open={otherListOpen} onOpenChange={setOtherListOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={otherListOpen}
              className="w-full justify-between"
            >
              {selectedOtherList.length > 0
                ? selectedOtherList.join(", ")
                : "Select other options..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-full p-0">
            <Command>
              <CommandInput
                placeholder="Search other options..."
                value={searchTerm}
                onValueChange={(value) => setSearchTerm(value)}
              />
              <CommandList>
                {filteredOtherListOptions.length > 0 ? (
                  <CommandGroup>
                    {filteredOtherListOptions.map((optionName) => (
                      <CommandItem
                        key={optionName.value}
                        value={optionName.value}
                        onSelect={() => {
                          handleOtherListChange(optionName.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedOtherList.includes(optionName.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {optionName.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty>
                    No other option found. Start typing to add a new option.
                  </CommandEmpty>
                )}
              </CommandList>
              {filteredOtherListOptions.length === 0 && searchTerm && (
                <div className="p-2">
                  <Button
                    onClick={() => handleAddNewOtherListOption(searchTerm)}
                  >
                    Add "{searchTerm}" as a new option
                  </Button>
                </div>
              )}
            </Command>
          </PopoverContent>
        </Popover>
        {/* {error.otherList && <div className="text-destructive">{error.otherList}</div>} */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Car offer title</Label>
        <Input
          placeholder="Enter a car offer title"
          type="text"
          id="name"
          name="name"
          required
          defaultValue={car?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="model">Model</Label>
          <Input
            placeholder="Enter a car model"
            type="text"
            id="model"
            name="model"
            required
            defaultValue={car?.model || ""}
          />
          {error.model && <div className="text-destructive">{error.model}</div>}
        </div>
        <div className="space-y-2 flex-1 ">
          <Label htmlFor="isNew">Vehicle Condition</Label>
          <Select
            name="isNew"
            required
            value={selectedVehicleCondition}
            onValueChange={handleVehicleConditionChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a vehicle condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Used">Used</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {error.isNew && <div className="text-destructive">{error.isNew}</div>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="canNegotiate">Is the price negotiable?</Label>
          <Select
            name="canNegotiate"
            required
            value={selectedCanNegotiate}
            onValueChange={handleCanNegotiateChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {error.canNegotiate && (
            <div className="text-destructive">{error.canNegotiate}</div>
          )}
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="priceInCents">Price in Cents</Label>
          <Input
            placeholder="Enter a car price"
            type="number"
            id="priceInCents"
            name="priceInCents"
            required
            value={priceInCents}
            onChange={(e) =>
              setPriceInCents(Number(e.target.value) || undefined)
            }
          />
          <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
          </div>
          {error.priceInCents && (
            <div className="text-destructive">{error.priceInCents}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="brand">Brand</Label>
          <Select
            name="brand"
            required
            value={selectedBrand}
            onValueChange={handleBrandChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a car brand" />
              {/* zmienic na comboBox */}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Most popular:</SelectLabel>
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
                <SelectLabel>Alphabetical:</SelectLabel>
                <SelectItem value="art">Argentina Time (ART)</SelectItem>
                <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.brand && <div className="text-destructive">{error.brand}</div>}
        </div>

        <div className="space-y-2 flex-1 ">
          <Label htmlFor="year">Production year</Label>
          <Input
            placeholder="Enter a year of production"
            type="number"
            id="year"
            name="year"
            required
            defaultValue={car?.year || ""}
          />
          {error.year && <div className="text-destructive">{error.year}</div>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            placeholder="Enter a mileage"
            type="number"
            id="mileage"
            name="mileage"
            required
            defaultValue={car?.mileage || ""}
          />
          {error.mileage && (
            <div className="text-destructive">{error.mileage}</div>
          )}
        </div>

        <div className="space-y-2 flex-1 ">
          <Label htmlFor="fuelType">Fuel type</Label>
          <Select
            name="fuelType"
            required
            value={selectedFuelType}
            onValueChange={handleFuelTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Petrol + LPG">Petrol + LPG</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="CNG">CNG</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.fuelType && (
            <div className="text-destructive">{error.fuelType}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="gearboxType">Gearbox type</Label>
          <Select
            name="gearboxType"
            required
            value={selectedGearboxType}
            onValueChange={handleGearboxTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a gearbox type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Semi-automatic">Semi-automatic</SelectItem>
                <SelectItem value="CVT">
                  CVT (Continuously Variable Transmission)
                </SelectItem>
                <SelectItem value="Dual-clutch">Dual-clutch</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.gearboxType && (
            <div className="text-destructive">{error.gearboxType}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="engineDisplacement">Engine displacement</Label>
          <Input
            placeholder="Enter an engine displacement"
            type="number"
            id="engineDisplacement"
            name="engineDisplacement"
            required
            defaultValue={car?.engineDisplacement || ""}
          />
          {error.engineDisplacement && (
            <div className="text-destructive">{error.engineDisplacement}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="horsePower">Horse power</Label>
          <Input
            placeholder="Enter a horse power"
            type="number"
            id="horsePower"
            name="horsePower"
            required
            defaultValue={car?.horsePower || ""}
          />
          {error.horsePower && (
            <div className="text-destructive">{error.horsePower}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="bodyType">Body type</Label>
          <Select
            name="bodyType"
            required
            value={selectedBodyType}
            onValueChange={handleBodyTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a body type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="Hatchback">Hatchback</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Coupe">Coupe</SelectItem>
                <SelectItem value="Convertible">Convertible</SelectItem>
                <SelectItem value="Wagon">Wagon</SelectItem>
                <SelectItem value="Pickup">Pickup</SelectItem>
                <SelectItem value="Minivan">Minivan</SelectItem>
                <SelectItem value="Van">Van</SelectItem>
                <SelectItem value="Crossover">Crossover</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.bodyType && (
            <div className="text-destructive">{error.bodyType}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="VIN">VIN</Label>
          <Input
            placeholder="Enter a VIN number"
            type="text"
            id="VIN"
            name="VIN"
            required
            defaultValue={car?.VIN || ""}
          />
          {error.VIN && <div className="text-destructive">{error.VIN}</div>}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="version">Version</Label>
          <Input
            placeholder="Enter a car version"
            type="text"
            id="version"
            name="version"
            required
            defaultValue={car?.version || ""}
          />
          {error.version && (
            <div className="text-destructive">{error.version}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="generation">Generation</Label>
          <Input
            placeholder="Enter a car generation"
            type="text"
            id="generation"
            name="generation"
            required
            defaultValue={car?.generation || ""}
          />
          {error.generation && (
            <div className="text-destructive">{error.generation}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="doorsAmount">Doors amount</Label>
          <Input
            placeholder="Enter doors amount"
            type="number"
            id="doorsAmount"
            name="doorsAmount"
            required
            defaultValue={car?.doorsAmount || ""}
          />
          {error.doorsAmount && (
            <div className="text-destructive">{error.doorsAmount}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="seatsAmount">Seats amount</Label>
          <Input
            placeholder="Enter seats amount"
            type="number"
            id="seatsAmount"
            name="seatsAmount"
            required
            defaultValue={car?.seatsAmount || ""}
          />
          {error.seatsAmount && (
            <div className="text-destructive">{error.seatsAmount}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="colorType">Color type</Label>
          <Select
            name="colorType"
            required
            value={selectedColorType}
            onValueChange={handleColorTypeChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a color type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Solid">Solid</SelectItem>
                <SelectItem value="Metallic">Metallic</SelectItem>
                <SelectItem value="Pearl">Pearl</SelectItem>
                <SelectItem value="Matte">Matte</SelectItem>
                <SelectItem value="Gloss">Gloss</SelectItem>
                <SelectItem value="Satin">Satin</SelectItem>
                <SelectItem value="Chrome">Chrome</SelectItem>
                <SelectItem value="Flip-flop">
                  Flip-flop (Color-shifting)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.colorType && (
            <div className="text-destructive">{error.colorType}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="color">Color</Label>
          <Input
            placeholder="Enter a color"
            type="text"
            id="color"
            name="color"
            required
            defaultValue={car?.color || ""}
          />
          {error.color && <div className="text-destructive">{error.color}</div>}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="drivetrain">Drivetrain</Label>
          <Select
            name="drivetrain"
            required
            value={selectedDrivetrain}
            onValueChange={handleDrivetrainChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a drivetrain type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="FWD">FWD (Front-Wheel Drive)</SelectItem>
                <SelectItem value="RWD">RWD (Rear-Wheel Drive)</SelectItem>
                <SelectItem value="AWD">AWD (All-Wheel Drive)</SelectItem>
                <SelectItem value="4WD">4WD (Four-Wheel Drive)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.drivetrain && (
            <div className="text-destructive">{error.drivetrain}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="CO2Emission">CO2 emission amount</Label>
          <Input
            placeholder="Enter a CO2 emission amount"
            type="text"
            id="CO2Emission"
            name="CO2Emission"
            required
            defaultValue={car?.CO2Emission || ""}
          />
          {error.CO2Emission && (
            <div className="text-destructive">{error.CO2Emission}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="cityFuelConsumption">
            City fuel consumption amount
          </Label>
          <Input
            placeholder="Enter a city fuel consumption amount"
            type="text"
            id="cityFuelConsumption"
            name="cityFuelConsumption"
            required
            defaultValue={car?.cityFuelConsumption || ""}
          />
          {error.cityFuelConsumption && (
            <div className="text-destructive">{error.cityFuelConsumption}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="outOfCityFuelConsumption">
            Out of city fuel consumption amount
          </Label>
          <Input
            placeholder="Enter an out of city fuel consumption amount"
            type="text"
            id="outOfCityFuelConsumption"
            name="outOfCityFuelConsumption"
            required
            defaultValue={car?.outOfCityFuelConsumption || ""}
          />
          {error.outOfCityFuelConsumption && (
            <div className="text-destructive">
              {error.outOfCityFuelConsumption}
            </div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="countryOfOrigin">Country of origin</Label>
          <Input
            placeholder="Enter a country of origin"
            type="text"
            id="countryOfOrigin"
            name="countryOfOrigin"
            required
            defaultValue={car?.countryOfOrigin || ""}
          />
          {error.countryOfOrigin && (
            <div className="text-destructive">{error.countryOfOrigin}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="hasRegistrationNumber">
            Does vehicle have a registration number?
          </Label>
          <Select
            name="hasRegistrationNumber"
            required
            value={selectedHasRegistrationNumber}
            onValueChange={handleHasRegistrationNumberChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.hasRegistrationNumber && (
            <div className="text-destructive">
              {error.hasRegistrationNumber}
            </div>
          )}
        </div>

        <div className="space-y-2 flex-1 ">
          <Label htmlFor="registeredInPoland">
            Is vehicle registered in Poland?
          </Label>
          <Select
            name="registeredInPoland"
            required
            value={selectedRegisteredInPoland}
            onValueChange={handleRegisteredInPolandChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.registeredInPoland && (
            <div className="text-destructive">{error.registeredInPoland}</div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="driverPlateNumber">Driver plate number</Label>
          <Input
            placeholder="Enter a driver plate number"
            type="text"
            id="driverPlateNumber"
            name="driverPlateNumber"
            required
            defaultValue={car?.driverPlateNumber || ""}
          />
          {error.driverPlateNumber && (
            <div className="text-destructive">{error.driverPlateNumber}</div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="firstRegistrationDate">First registration date</Label>
          <Popover>
            <PopoverTrigger className="w-full" asChild>
              <Button variant="outline" className="flex justify-start w-full">
                Select a date
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-full">
              <div className="grid gap-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Enter a first registration date
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      placeholder="Enter a year"
                      type="number"
                      id="year"
                      value={year}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value.length >= 4) {
                          const numericValue = parseInt(value, 10);
                          const currentYear = new Date().getFullYear();

                          if (
                            numericValue >= 1950 &&
                            numericValue <= currentYear
                          ) {
                            setYear(value);
                          } else if (numericValue < 1950) {
                            setYear("1950");
                          } else if (numericValue > currentYear) {
                            setYear(currentYear.toString());
                          }
                        } else {
                          setYear(value);
                        }
                      }}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="month">Month</Label>
                    <Input
                      placeholder="Enter a month"
                      type="number"
                      id="month"
                      value={month}
                      onChange={(e) => {
                        let value = parseInt(e.target.value, 10);

                        if (value >= 1 && value <= 12) {
                          setMonth(value.toString());
                        } else if (value < 1) {
                          setMonth("1");
                        } else if (value > 12) {
                          setMonth("12");
                        }
                      }}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="day">Day</Label>
                    <Input
                      placeholder="Enter a day"
                      type="number"
                      id="day"
                      value={day}
                      onChange={(e) => {
                        let value = parseInt(e.target.value, 10);

                        if (value >= 1 && value <= 31) {
                          setDay(value.toString());
                        } else if (value < 1) {
                          setDay("1");
                        } else if (value > 31) {
                          setDay("31");
                        }
                      }}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <div className="text-muted-foreground">{firstRegistrationDate}</div>

          <input
            type="hidden"
            name="firstRegistrationDate"
            value={firstRegistrationDate}
          />
          {error.firstRegistrationDate && (
            <div className="text-destructive">
              {error.firstRegistrationDate}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="space-y-2 flex-1 mb-8">
          <Label htmlFor="isFirstOwner">
            Is the customer a first owner of the vehicle?
          </Label>
          <Select
            name="isFirstOwner"
            required
            value={selectedIsFirstOwner}
            onValueChange={handleIsFirstOwnerChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.isFirstOwner && (
            <div className="text-destructive">{error.isFirstOwner}</div>
          )}
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="servicedInASO">
            Was the vehicle serviced in ASO?
          </Label>
          <Select
            name="servicedInASO"
            required
            value={selectedServicedInASO}
            onValueChange={handleServicedInASOChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available options:</SelectLabel>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {error.servicedInASO && (
            <div className="text-destructive">{error.servicedInASO}</div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Enter a description"
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
        <Label htmlFor="file">Attach files</Label>
        <Input type="file" id="file" name="file" required={car == null} />
        {car != null && (
          <div className="text-muted-foreground">{car.filePath}</div>
        )}
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Attach images</Label>
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
