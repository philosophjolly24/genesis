"use client";

import { Checkbox } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { Item } from "../../database/api/api";
import { formatCurrency } from "../../settings";
import { itemAPI } from "../api";
import { ItemContext } from "../../context/appContext";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const [checked, setChecked] = useState(item.checked);
  useEffect(() => {
    setChecked(item.checked);
  }, [item.checked]);
  const categoryIconPath = `${item.category?.name
    .replaceAll(" ", "-")
    .trim()
    .toLowerCase()}.svg`;
  if (
    item === undefined ||
    item.price === undefined ||
    item.quantity === undefined
  )
    return null;

  return (
    <div
      className={` relative flex items-center gap-5 justify-between h-20   bg-background-white 
      `}
    >
      <CheckBoxComp
        checked={checked}
        setChecked={setChecked}
        itemID={item.id}
        itemChecked={checked}
      ></CheckBoxComp>

      {/* title and quantity div */}

      <div className="flex  flex-col justify-between items-center grow gap-4 ">
        <div className="flex items- justify-between gap-2 w-full ">
          <Image
            width={22}
            height={22}
            src={categoryIconPath}
            alt={`${item.category?.name}`}
            className="stroke-current text-black"
          ></Image>
          <p
            className={`w-full text-lg  ${
              !checked ? "text-black-2" : "text-black-4/40"
            }`}
          >
            {item.name}
          </p>
        </div>
        {item.quantity === 0 ? null : (
          <div className="flex gap-3 mr-auto justify-between w-[90%] grow">
            <p className={` ${!checked ? "text-black-3" : "text-black-4/20"}`}>
              x{item.quantity}
            </p>
            <p className={` ${!checked ? "text-black-3" : "text-black-4/20"}`}>
              {formatCurrency(item.price)}
            </p>
            <p className={` ${!checked ? "text-black-3" : "text-black-4/20"}`}>
              {formatCurrency(+(item.price * item.quantity))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
interface CheckboxCompProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  itemID: string;
  itemChecked: boolean;
}

function CheckBoxComp({ checked, setChecked, itemID }: CheckboxCompProps) {
  const { listID } = use(ItemContext);
  return (
    <Checkbox
      checked={checked}
      defaultChecked={checked}
      onChange={async (checkedState) => {
        setChecked(checkedState);
        await itemAPI.handleItemChecked(itemID, checkedState, listID ?? "");
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="group block size-5 rounded border bg-background-white data-checked:bg-brand border-grey-2 "
    >
      {/* Checkmark icon */}
      <svg
        className="stroke-background-white opacity-0 group-data-checked:opacity-100 "
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3 8L6 11L11 3.5"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className=""
        />
      </svg>
    </Checkbox>
  );
}
