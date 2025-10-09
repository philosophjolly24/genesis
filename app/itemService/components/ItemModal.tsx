"use client";

import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import { categories } from "../../util/categories";
import { ItemContext } from "../../context/appContext";
import { v7 as uuidv7 } from "uuid";
import { Item } from "../../database/api/api";
import Modal from "../../components/Modal";
import { clearListFields } from "../../util/clearFields";
import { formatCurrency } from "../../settings";
import DropDown from "../../components/Dropdown";
import Button from "../../components/Button";
import { handleAddItemToList, handleItemDelete } from "..";
import { itemAPI } from "../api";
import { notify } from "../../util/notify";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

// * Interfaces
interface AddItemToListProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  currentItem: Item | null;
  setCurrentItem: Dispatch<SetStateAction<Item | null>>;
}

export default function ItemModal({
  isModalVisible,
  setIsModalVisible,
  currentItem,
  setCurrentItem,
}: AddItemToListProps) {
  //
  // * States
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [tempPrice, setTempPrice] = useState<string>("");
  const [tempQuantity, setTempQuantity] = useState<string>("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<{
    id: number;
    name: string;
  }>(categories[0]);
  const [notes, setNotes] = useState("");
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null);
  const [itemExists, setItemExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // * Refs
  const priceRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const heading = useRef<string>("");

  // * context
  const { listID, items } = use(ItemContext);

  // NOTE: item object that will be used to add item
  const item = {
    id: uuidv7(),
    list_id: listID ?? "",
    name: name.trim(),
    quantity,
    unit: unit.trim(),
    price,
    category,
    notes,
    checked: false,
  };

  // * sets state to the currents items fields
  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setQuantity(currentItem.quantity ?? 0);
      setTempQuantity(currentItem.quantity?.toString() ?? "0");
      setUnit(currentItem.unit ?? "");
      setPrice(currentItem.price ?? 0);
      setTempPrice(currentItem.price?.toString() ?? "0");
      setCategory(currentItem.category ?? categories[0]);
      setNotes(currentItem.notes ?? "");
      heading.current = currentItem?.name ?? "";
      setIsEditing(true);
    }
  }, [currentItem]);

  // * check if item already exists
  useEffect(() => {}, [
    setCurrentItem,
    items,
    name,
    currentItem,
    unit,
    isEditing,
  ]);

  return (
    <>
      <Toaster></Toaster>
      <Modal
        height={170}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setCurrentItem={setCurrentItem}
        //  clear all states
        onClear={() => {
          setItemExists(false);
          setIsModalVisible(false);
          setIsEmpty(false);
          setCurrentItem(null);
          setIsEditing(false);
          clearListFields({
            setName,
            setCategory,
            setQuantity,
            setUnit,
            setPrice,
            setNotes,
            setTempPrice,
            setTempQuantity,
          });
          heading.current = "";
        }}
      >
        <div className="flex items-center justify-center w-full gap-3">
          <h1 className="font-open-sans text-3xl font-[550] text-center py-10  m-a text-black-1 truncate sticky max-w-[90%] grow">
            {/*
         // NOTE: (currentItem === null && itemExists === false) checks whether an item will be updated or whether a user wants to add a new item
         */}
            {(currentItem === null && itemExists === false) ||
            heading.current === ""
              ? "Add Item to list"
              : currentItem?.name || heading.current}
          </h1>
          <Image
            width={36}
            height={36}
            src={"close.svg"}
            alt="close"
            className="mr-4"
            onClick={() => {
              setItemExists(false);
              setIsModalVisible(false);
              setIsEmpty(false);
              setCurrentItem(null);
              setIsEditing(false);
              clearListFields({
                setName,
                setCategory,
                setQuantity,
                setUnit,
                setPrice,
                setNotes,
                setTempPrice,
                setTempQuantity,
              });
              heading.current = "";
            }}
          ></Image>
        </div>
        {/* 
        // #:-------------------  Feature: Name  ------------------- //
      */}
        <label className="max-w-[90%] w-full text-lg mb-1">Name</label>
        <input
          type="text"
          value={name}
          className="w-[90%] h-8  rounded-[4px] mb-2 focus:outline-brand text-center text-lg bg-background-white border border-grey-2"
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim() == "") {
              setIsEmpty(true);
            } else setIsEmpty(false);
          }}
        />
        {/* 
        // #:-------------------  Feature: name validation label  ------------------- //
      */}
        {isEmpty ? (
          <>
            <p className="text-error-1 font-semibold"> name may not be empty</p>
          </>
        ) : null}
        <div className="max-w-[90%] flex items-center justify-between flex-row w-full gap-8">
          <div className="">
            {/* 
           // #:-------------------  Feature: Quantity ------------------- //
          */}
            <label className="block text-lg mb-1">Qty</label>
            <input
              type="text"
              ref={qtyRef}
              value={tempQuantity}
              className="w-[100%] h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
              onChange={(e) => {
                const val = e.target.value;

                // *validate whether the value in the input is a number between 1-9
                if (/^[1-9]\d*$/.test(val)) {
                  setTempQuantity(val); // set input to the value
                  setQuantity(+val); // set the price to value
                } else setTempQuantity(""); // else set the input to empty
              }}
            />
          </div>
          <div>
            {/* 
            // #:-------------------  Feature: Unit ------------------- //
          */}
            <label className="block text-lg mb-1">Unit</label>
            <input
              type="text"
              value={unit}
              className="w-[100%]  h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="max-w-[90%] flex items-center justify-between flex-row w-full gap-8">
          <div>
            {/* 
            // #:-------------------  Feature: Price ------------------- //
          */}
            <label className="block text-lg mb-1">Price</label>
            <input
              type="text"
              ref={priceRef}
              value={tempPrice}
              className=" w-full h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
              onChange={(e) => {
                const val = e.target.value;

                // validate whether the value in the input is a number between 1-9
                if (/^[1-9]\d*$/.test(val)) {
                  setTempPrice(val); // set input to the value
                  setPrice(+val); // set the price to value
                } else setTempPrice(""); //else set the input to empty
              }}
            />
          </div>
          <div className="flex items-center justify-center flex-col ">
            {/* 
            // #:-------------------  Feature: price total ------------------- //
          */}
            <label className="text-center w-full h-full  m-auto mr-2 mt-5  text-lg">
              Total
            </label>
            <label className="text-center w-full h-full  m-auto mr-2 text-grey-3 mb-3 text-lg">
              {
                formatCurrency(+(price || 0) * +(quantity || 0)) //* currency formatting based on locale
              }
            </label>
          </div>
        </div>
        <label className="  text-lg mb-1">Category</label>
        {/* 
        // #:-------------------  Feature: Category dropdown  ------------------- //
      */}
        <DropDown
          options={categories}
          setSelectedCategory={setCategory}
          selectedCategory={category}
        ></DropDown>

        {/* 
        // #:-------------------  Feature: Notes  ------------------- //
      */}
        <label className=" max-w-[90%] w-full text-lg mb-1">Notes</label>
        <textarea
          value={notes}
          className="w-[90%] h-40 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
          onChange={(e) => {
            setNotes(e.target.value);
          }}
        />

        {/* 
        // #:-------------------  Feature: Add to list / Update item  ------------------- //
      */}
        <Button
          onClick={async () =>
            handleItemModalButton({
              currentItem,
              items,
              item,
              listID,
              setIsEmpty,
              setIsModalVisible,
              setItemExists,
              setCurrentItem,
              setName,
              setCategory,
              setQuantity,
              setUnit,
              setPrice,
              setNotes,
              setTempPrice,
              setTempQuantity,
            })
          }
          text={currentItem !== null ? "update item" : "Add Item to list"}
          style=" mb-4 mt-2 "
        ></Button>
        <p
          className={`text-red-400 text-xl font-semibold pb-3 ${
            currentItem !== null ? "" : `hidden`
          }`}
          onClick={() => {
            handleItemDelete(currentItem?.id ?? "");
            setCurrentItem(null);
            //  clear all states
            clearListFields({
              setName,
              setCategory,
              setQuantity,
              setUnit,
              setPrice,
              setNotes,
              setTempPrice,
              setTempQuantity,
            });
            setItemExists(false);
            setIsModalVisible(false);
          }}
        >
          delete item
        </p>
      </Modal>
    </>
  );
}

interface handleItemModalButtonProps {
  currentItem: Item | null;
  item: Item;
  items: Item[] | undefined;
  listID: string | undefined;
  setIsEmpty: Dispatch<SetStateAction<boolean | null>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  setItemExists: Dispatch<SetStateAction<boolean>>;
  setCurrentItem: Dispatch<SetStateAction<Item | null>>;
  setName: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  setQuantity: Dispatch<SetStateAction<number>>;
  setUnit: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setNotes: Dispatch<SetStateAction<string>>;
  setTempPrice: Dispatch<SetStateAction<string>>;
  setTempQuantity: Dispatch<SetStateAction<string>>;
}
const handleItemModalButton = async ({
  currentItem,
  items,
  item,
  listID,
  setIsEmpty,
  setIsModalVisible,
  setItemExists,
  setCurrentItem,
  setName,
  setCategory,
  setQuantity,
  setUnit,
  setPrice,
  setNotes,
  setTempPrice,
  setTempQuantity,
}: handleItemModalButtonProps) => {
  if (!currentItem) {
    const itemExists = items?.find(
      // message triggers because u clear the edit when you close the modal
      (curItem) => {
        return curItem.name === item?.name && curItem.unit === item.unit;
      }
    );

    if (itemExists) {
      notify.emoji(
        "items already exists, displaying item information ...",
        "📢"
      );
      setCurrentItem(itemExists);
      return;
    }
  }

  if (currentItem) {
    itemAPI.handleItemUpdate(
      currentItem.id,
      {
        ...item,
        id: currentItem.id,
        checked: currentItem?.checked, // TODO: add option to settings later to choose this mode
      },
      listID ?? ""
    );
    //  clear all states
    setIsModalVisible(false);
    setItemExists(false);
    setCurrentItem(null);
    clearListFields({
      setName,
      setCategory,
      setQuantity,
      setUnit,
      setPrice,
      setNotes,
      setTempPrice,
      setTempQuantity,
    });
  } else if (currentItem === null) {
    await handleAddItemToList(item, items ?? [], setIsEmpty);
    //  clear all states
    setIsModalVisible(false);
    setItemExists(false);
    setCurrentItem(null);
    clearListFields({
      setName,
      setCategory,
      setQuantity,
      setUnit,
      setPrice,
      setNotes,
      setTempPrice,
      setTempQuantity,
    });
  }
};
