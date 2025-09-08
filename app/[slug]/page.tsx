// INFO: Lists page

"use client";

// Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { databaseAPI } from "../(database)/api/api";
import Button from "../(components)/Button";
import Modal from "../(components)/Modal";
import { useLiveQuery } from "dexie-react-hooks";
import { v7 as uuidv7 } from "uuid";
import { handleAddItemToList } from "../(itemService)";
import listAPI from "../(listService)/api";
import { List } from "../(database)/api/api";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

// Interfaces

interface AddItemToListProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  listID: string;
}

const categories = [
  { id: 1, name: "Grains" },
  { id: 2, name: "Baked goods" },
  { id: 3, name: "Alcohol" },
  { id: 4, name: "Dairy" },
  { id: 5, name: "Desserts" },
  { id: 6, name: "Seafood" },
  { id: 7, name: "Beverages" },
  { id: 8, name: "Hot drinks" },
  { id: 9, name: "Fruits & Veg" },
  { id: 10, name: "Meat" },
  { id: 11, name: "Personal hygiene" },
  { id: 12, name: "snacks & treats" },
  { id: 13, name: "others" },
];

// Main Component
export default function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [list, setList] = useState<List | null>(null);
  const [listID, setListID] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // INFO: Page useEffect
  useEffect(() => {
    // set current list_id
    listAPI.asyncSetListId(setListID, setList, params, listID);
  }, [params, listID]);
  // retrieve the list items on load

  const items = useLiveQuery(() => {
    return databaseAPI.getAllItemsForList(listID);
  }, [listID]);

  // * if null then the items are still loading
  if (!items) return null;
  console.log(items);

  // * if list is found/loaded
  if (list !== null)
    return (
      <>
        <AddItemToList
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          listID={listID}
        />

        <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1 truncate pl-4 pr-4">
          {list.name}
        </h1>
        <ul>
          {items?.map((item) => {
            return (
              <li key={item.id}>
                <p>{item.name}</p>

                <p>{item.quantity}</p>
                <p>{item.price}</p>
              </li>
            );
          })}
        </ul>
        <Button
          onClick={() => {
            setIsModalVisible(true);
          }}
          text={"add a new list"}
        ></Button>

        {items.length == 0 ? (
          <p className="m-auto w-full text-center mt-50">
            {" "}
            add some items to your list to get started
          </p>
        ) : null}
      </>
    );
}

// INFO: Adding item to list modal window component

function AddItemToList({
  isModalVisible,
  setIsModalVisible,
  listID,
}: AddItemToListProps) {
  // State declarations
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [notes, setNotes] = useState("");
  const [isEmpty, setIsEmpty] = useState<boolean | null>(null);

  const item = {
    id: uuidv7(),
    list_id: listID,
    name,
    quantity,
    unit,
    price,
    category,
    notes,
  };

  return (
    <Modal
      height={170}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
    >
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1 truncate pl-4 pr-4 sticky">
        Add Item to list
      </h1>
      {/*name input */}
      <label className="max-w-[90%] w-full text-lg mb-1">Name</label>
      <input
        type="text"
        name=""
        id=""
        className="w-[90%] h-8  rounded-[4px] mb-2 focus:outline-brand text-center text-lg bg-background-white border border-grey-2"
        onChange={(e) => {
          setName(e.target.value);
          if (e.target.value.trim() == "") {
            setIsEmpty(true);
          } else setIsEmpty(false);
        }}
      />
      {isEmpty ? (
        <>
          <p className="text-error-1 font-semibold"> name may not be empty</p>
        </>
      ) : null}
      <div className="max-w-[90%] flex items-center justify-between flex-row w-full gap-8">
        <div className="">
          {/*quantity input */}
          <label className="block text-lg mb-1">Qty</label>
          <input
            type="text"
            className="w-[100%] h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
            onChange={(e) => {
              setQuantity(+e.target.value);
            }}
          />
        </div>
        <div>
          {/* unit input */}
          <label className="block text-lg mb-1">Unit</label>
          <input
            type="text"
            name=""
            id=""
            className="w-[100%]  h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="max-w-[90%] flex items-center justify-between flex-row w-full gap-8">
        <div>
          {/* price input */}
          <label className="block text-lg mb-1">Price</label>
          <input
            type="text"
            name=""
            id=""
            className=" w-full h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
            onChange={(e) => {
              setPrice(+e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center flex-col ">
          {/* price total label */}
          <label className="text-center w-full h-full  m-auto mr-2 mt-5  text-lg">
            Total
          </label>
          <label className="text-center w-full h-full  m-auto mr-2 text-grey-3 mb-3 text-lg">
            {/* // TODO: add some locale currency from the settings */}
            {(price * quantity).toFixed(2)}
          </label>
        </div>
      </div>
      {/*// NOTE: continue from here( already installed react-select :https://react-select.com/home#getting-started`) */}

      {/* category input */}
      <label className="  text-lg mb-1">Category</label>

      {/* dropdown */}
      <CategoriesListbox></CategoriesListbox>

      {/* notes input */}
      <label className=" max-w-[90%] w-full text-lg mb-1">Notes</label>
      <textarea
        className="w-[90%] h-40 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
        onChange={(e) => {
          setNotes(e.target.value);
        }}
      />
      {/* add to list button */}
      <Button
        onClick={() => {
          handleAddItemToList(item, setIsEmpty);
          setIsModalVisible(false);
          //  clear all states
          setName("");
          setQuantity(0);
          setUnit("");
          setPrice(0);
          setCategory(null);
          setNotes("");
        }}
        text="Add Item to list"
        style=" mb-4 mt-2 "
      ></Button>
    </Modal>
  );
}

function CategoriesListbox() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      <ListboxButton
        className={`border bg-background-white w-[90%] border-grey-2 rounded-md h-8`}
      >
        {selectedCategory.name}
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="z-20 bg-background-white w-[75%] shadow-list border border-grey-2 "
      >
        {categories.map((person) => (
          <ListboxOption
            key={person.id}
            value={person}
            className="data-focus:bg-brand data-focus:text-white text-center"
          >
            {person.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
