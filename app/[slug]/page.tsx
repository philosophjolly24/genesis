//  TITLE: User's list page

"use client";

// * Imports
import {
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

import { Item } from "../database/api/api";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { v7 as uuidv7 } from "uuid";
import { ListboxOption } from "@headlessui/react";
import DropDown from "../components/Dropdown";
import { formatCurrency } from "../settings";
import ItemCard from "../itemService/components/ItemCard";
import ProgressBar from "../components/ProgressBar";
import ListSummary from "../itemService/components/ListSummary";
import { itemAPI } from "../itemService/api";
import { ItemContext } from "../context/appContext";
import { categories } from "../util/categories";
import { handleAddItemToList } from "../itemService";
import { clearListFields } from "../util/clearFields";
import ContextMenu from "../components/ContextMenu";
import Image from "next/image";

// * Interfaces
interface AddItemToListProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  listID: string;
  currentItem: Item | null;
  setCurrentItem: Dispatch<SetStateAction<Item | null>>;
}

// NOTE: Home component
export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const { items, itemsChecked, list, listID } = use(ItemContext);

  // prevent scroll when modal is open
  useEffect(() => {
    if (isModalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalVisible]);

  if (!items) return null; // * if null then the items are still loading
  if (itemsChecked == undefined) return null; // * if null then there are no checked items

  const listTotal = itemAPI.getListTotalPrice(items);

  // * if list is found/loaded
  if (list !== null && list !== undefined)
    return (
      <>
        <ItemModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          listID={listID !== undefined ? listID : ""}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
        {/* 
        // #:-------------------  Feature: Progress bar  ------------------- //
      */}
        <div className="mb-4">
          <ProgressBar
            listID={listID !== undefined ? listID : ""}
          ></ProgressBar>
        </div>
        {/* 
        // #:-------------------  Feature:  List heading bar  ------------------- //
      */}
        <div className="flex items-center justify-center pb-10 gap-4">
          <h1 className="font-open-sans text-3xl font-[550] m-auto text-center  m-a text-black-1 truncate pl-4 pr-4">
            {list.name}
          </h1>{" "}
          <Image width={24} height={24} src={"search.svg"} alt="search"></Image>
          <ContextMenu
            content={({ close }) =>
              ListOptions({
                close,
              })
            }
          >
            <Image
              width={24}
              height={24}
              src={"more-options-vertical.svg"}
              alt="more-options-vertical"
            ></Image>
          </ContextMenu>
        </div>
        {/* 
        // #:-------------------  Feature: List items  ------------------- //
      */}
        <ul className={`pb-30 ${isModalVisible ? "overflow-hidden" : ""}`}>
          {items?.map((item) => {
            return (
              <li
                key={item.id}
                className="w-full border-t border-b mb-6  border-grey-2 "
                onClick={() => {
                  setCurrentItem(item);
                  setIsModalVisible(true);
                }}
              >
                <ItemCard item={item}></ItemCard>
              </li>
            );
          })}
        </ul>
        <Button
          onClick={() => {
            setIsModalVisible(true);
          }}
          text={"add a new list"}
          style=" fixed bottom-20 left-0 right-0"
        ></Button>
        <ListSummary
          listTotal={listTotal}
          listID={listID !== undefined ? listID : ""}
        ></ListSummary>
        {/*
          // * if there are no lists  
        */}
        {items.length == 0 ? (
          <p className="m-auto w-full text-center mt-50">
            {" "}
            add some items to your list to get started
          </p>
        ) : null}
      </>
    );
}

// NOTE: Adding items to list

function ItemModal({
  isModalVisible,
  setIsModalVisible,
  listID,
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

  // * Refs
  const priceRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  // NOTE: item object that will be used to add item
  const item = {
    id: uuidv7(),
    list_id: listID,
    name,
    quantity,
    unit,
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
    }
  }, [currentItem]);

  return (
    <Modal
      height={170}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      setCurrentItem={setCurrentItem}
      onClear={() =>
        clearListFields({
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
    >
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1 truncate pl-4 pr-4 sticky max-w-[90%]">
        {/*
         // NOTE: (currentItem !== null ?) checks whether an item will be updated or whether a user wants to add a new item
         */}
        {currentItem !== null ? currentItem.name : "Add Item to list"}
      </h1>
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
        className=""
      >
        {categories.map((category) => (
          <ListboxOption
            key={category.id}
            value={category}
            className="data-focus:bg-brand data-focus:text-white text-center"
          >
            {category.name}
          </ListboxOption>
        ))}
      </DropDown>

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
        onClick={async () => {
          if (currentItem === null) {
            await handleAddItemToList(item, setIsEmpty);
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
            // hide modal window
            setIsModalVisible(false);
          } else {
            itemAPI.handleItemUpdate(currentItem.id, {
              ...item,
              id: currentItem.id,
              checked: currentItem.checked, // add option to settings later to choose this mode
            });
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
            setIsModalVisible(false);
          }
        }}
        text={currentItem !== null ? "update item" : "Add Item to list"}
        style=" mb-4 mt-2 "
      ></Button>
    </Modal>
  );
}

function ListOptions({ close }: { close?: () => void }) {
  return (
    <>
      <div className="z-10 bg-background-white h-auto w-50 flex flex-col  rounded-md border-2 border-grey  mr-2">
        <div
          className=" flex border-b border-grey-2 h-15 text-lg align-center items-center gap-4"
          onClick={(e) => {
            close?.();
          }}
        >
          <Image
            width={32}
            height={32}
            src={"share.svg"}
            alt="share"
            className="ml-2"
          ></Image>{" "}
          <p className="grow  text-left"> download list</p>
        </div>

        <div
          className=" flex border-b border-grey-2 h-15 text-lg align-center items-center gap-4"
          onClick={(e) => {
            close?.();
          }}
        >
          <Image
            width={32}
            height={32}
            src={"sort.svg"}
            alt="sort"
            className="ml-2 "
          ></Image>{" "}
          <p className="grow  text-left"> sort by:</p>
        </div>
        <div
          className=" flex border-b border-grey-2 h-15 text-lg align-center items-center gap-4"
          onClick={(e) => {
            close?.();
          }}
        >
          <Image
            width={24}
            height={24}
            src={"uncheck.svg"}
            alt="uncheck"
            className="ml-2"
          ></Image>{" "}
          <p className="grow  text-left p2"> uncheck all items</p>
        </div>
        <button
          className="border-b border-grey-2  h-15 text-lg text-error-1 gap-3 font-semibold"
          onClick={(e) => {
            close?.();
          }}
        >
          delete checked items
        </button>
      </div>
    </>
  );
}

// ! FIX: update the list updated_at field in the database on every item change
// ! FIX: context menu padding(maybe?)
// TODO: search
// TODO: more options popup
