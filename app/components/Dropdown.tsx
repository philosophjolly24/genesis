import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface DropDownProps {
  className?: string;
  options: { id: number; name: string }[];
  setSelectedCategory: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
    }>
  >;

  selectedCategory: {
    id: number;
    name: string;
  };
}
export default function DropDown({
  selectedCategory,
  setSelectedCategory,
  options,
}: DropDownProps) {
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <ListboxButton
        className={`border bg-background-white w-[90%] border-grey-2 rounded-md h-8`}
      >
        {selectedCategory.name || "Select category"}
      </ListboxButton>
      <ListboxOptions
        anchor={`bottom`}
        transition
        modal={false}
        className=" flex flex-col z-20 bg-background-white w-[75%] shadow-list border border-grey-2 origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 max-h-16 overflow-y-auto rounded-md data-[headlessui-state~=active]:bg-grey data-[headlessui-state~=active]:border-0"
      >
        {options.map((option) => (
          <ListboxOption
            key={option.id}
            value={option}
            className=" flex flex-row gap-3 cursor-pointer px-3 py-2 hover:bg-background-white text-center
                 data-[headlessui-state~=active]:bg-grey
                 data-[headlessui-state~=selected]:text-brand data-[headlessui-state~=selected]: text-md"
          >
            <Image
              width={16}
              height={16}
              src={`${option.name
                .replaceAll(" ", "-")
                .trim()
                .toLowerCase()}.svg`}
              alt={option.name.replaceAll(" ", "-").trim().toLowerCase()}
              className="stroke-white text-black"
            ></Image>
            {option.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
