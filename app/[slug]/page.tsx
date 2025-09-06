// * Lists page

"use client";

// Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { databaseAPI } from "../(database)/api/api";
import Button from "../(components)/Button";
import Modal from "../(components)/Modal";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { v7 as uuidv7 } from "uuid";
import { handleAddItemToList } from "../(itemService)";

// Interfaces

interface Item {
  id: string;
  list_id?: string; // foreign key
  category_id?: number; // foreign key
  quantity?: number;
  unit?: string;
  price?: number;
  name?: string;
  notes?: string;
}

interface List {
  id: string;
  emoji?: string;
  name: string;
  created_at: number;
  updated_at: number;
}

interface AddItemToListProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  listID: string;
}

// Main Component
export default function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [list, setList] = useState<List | null>(null);
  const [listID, setListID] = useState("");
  // const [items, setItems] = useState<Item[] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    async function asyncList() {
      setListID((await params).slug);
      setList((await databaseAPI.getList(listID)) ?? null);
      // setItems();
    }
    asyncList();
  }, [params, listID]);

  const items = useLiveQuery(() => {
    return databaseAPI.getAllItemsForList(listID);
  }, [listID]);

  if (!items) return null;

  if (list !== null)
    return (
      <main className="w-full max-w-[1200px] m-auto pl-3 pr-3">
        <AddItemToList
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          listID={listID}
        />
        <Link href={"/"}>
          <h1 className="font-open-sans text-[38px] font-extrabold text-brand text-center block mb-10">
            Genesis
          </h1>
        </Link>

        <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1 truncate pl-4 pr-4">
          {list.name}
        </h1>
        {/* render list items */}
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
      </main>
    );
}

// Adding item to list modal window component
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
  const [category, setCategory] = useState("");
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
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1 truncate pl-4 pr-4">
        Add Item to list
      </h1>
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
        <div className="flex items-center justify-center ">
          <label className="text-center w-full h-full  m-auto mr-2 mt-3 text-lg">
            R200
          </label>
        </div>
      </div>

      <label className=" max-w-[90%] w-full text-lg mb-1">Category</label>
      <input
        type=""
        name=""
        id=""
        className="w-[90%] h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <label className=" max-w-[90%] w-full text-lg mb-1">Notes</label>
      <textarea
        className="w-[90%] h-40 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
        onChange={(e) => {
          setNotes(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          handleAddItemToList(item, setIsEmpty);
        }}
        text="Add Item to list"
        style=" mb-4 mt-2 "
      ></Button>
    </Modal>
  );
}
