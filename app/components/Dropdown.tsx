import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface DropDownProps {
  className?: string;
  children: ReactNode;
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
  children,
  selectedCategory,
  setSelectedCategory,
}: DropDownProps) {
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <ListboxButton
        className={`border bg-background-white w-[90%] border-grey-2 rounded-md h-8`}
      >
        {selectedCategory.name}
      </ListboxButton>
      <ListboxOptions
        anchor={`bottom`}
        transition
        className="z-20 bg-background-white w-[75%] shadow-list border border-grey-2 origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 "
      >
        {children}
      </ListboxOptions>
    </Listbox>
  );
}
