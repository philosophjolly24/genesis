// INFO: Lists page

"use client";

// Imports
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { databaseAPI, Item } from "../database/api/api";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { useLiveQuery } from "dexie-react-hooks";
import { v7 as uuidv7 } from "uuid";
import { handleAddItemToList } from "../itemService";
import listAPI from "../listService/api";
import { List } from "../database/api/api";
import { ListboxOption } from "@headlessui/react";
import DropDown from "../components/Dropdown";
import { formatCurrency } from "../settings";
import ItemCard from "../itemService/components/ItemCard";
import ProgressBar from "../components/ProgressBar";
import ListSummary from "../itemService/components/ListSummary";
import useCheckedItemCount from "../hooks/useCheckedItemCount";
import { itemAPI } from "../itemService/api";

// Interfaces

interface AddItemToListProps {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  listID: string;
  currentItem: Item | null;
  setCurrentItem: Dispatch<SetStateAction<Item | null>>;
}

// TODO: move to a util file
const categories = [
  { id: 1, name: "Grains" },
  { id: 2, name: "Baked goods" },
  { id: 3, name: "Alcohol" },
  { id: 4, name: "Dairy" },
  { id: 5, name: "Desserts" },
  { id: 6, name: "Seafood" },
  { id: 7, name: "Beverages" },
  { id: 8, name: "Hot drinks" },
  { id: 9, name: "Fruits and Veg" },
  { id: 10, name: "Meat" },
  { id: 11, name: "Personal hygiene" },
  { id: 12, name: "Snacks and treats" },
  { id: 13, name: "Others" },
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
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  // INFO: Page useEffect
  useEffect(() => {
    // set current list_id
    listAPI.asyncSetListId(setListID, setList, params, listID);
  }, [params, listID]);
  // retrieve the list items on load

  const items = useLiveQuery(() => {
    return databaseAPI.getAllItemsForList(listID);
  }, [listID]);

  const itemsChecked = useCheckedItemCount(listID);

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

  // * if null then the items are still loading
  if (!items) return null;

  if (itemsChecked == undefined) return null;
  const listTotal = itemAPI.getListTotalPrice(items);

  // * if list is found/loaded
  if (list !== null)
    return (
      <>
        <ItemModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          listID={listID}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
        {/* progress bar */}
        <div className="mb-4">
          <ProgressBar listID={list.id}></ProgressBar>
        </div>

        <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pb-10 m-a text-black-1 truncate pl-4 pr-4">
          {list.name}
        </h1>

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
        <ListSummary listTotal={listTotal} listID={listID}></ListSummary>

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

function ItemModal({
  isModalVisible,
  setIsModalVisible,
  listID,
  currentItem,
  setCurrentItem,
}: AddItemToListProps) {
  // State declarations
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [tempPrice, setTempPrice] = useState<string>("");
  const [tempQuantity, setTempQuantity] = useState<string>("");
  const [price, setPrice] = useState(0);
  // const [total, setTotal] = useState(0);
  const [category, setCategory] = useState<{
    id: number;
    name: string;
  }>(categories[0]);
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
    checked: false,
  };

  const priceRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);

  // sets the states to the currents items fields
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
      // setTotal((currentItem.price ?? 0) * (currentItem?.quantity ?? 0));
    }
  }, [currentItem]);

  // calculates the total on list updates
  useEffect(() => {
    // setTotal(+(priceRef?.current?.value || 0) * +(qtyRef?.current?.value || 0));
  }, []);

  return (
    <Modal
      height={170}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      setCurrentItem={setCurrentItem}
      onClear={() => {
        setName("");
        setQuantity(0);
        setUnit("");
        setPrice(0);
        setCategory(categories[0]);
        setNotes("");
        setTempPrice("");
        setTempQuantity("");
      }}
    >
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1 truncate pl-4 pr-4 sticky max-w-[90%]">
        {currentItem !== null ? currentItem.name : "Add Item to list"}
      </h1>
      {/*name input */}
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
            ref={qtyRef}
            value={tempQuantity}
            className="w-[100%] h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
            onChange={(e) => {
              const val = e.target.value;

              // validate whether the value in the input is a number between 1-9
              if (/^[1-9]\d*$/.test(val)) {
                setTempQuantity(val); // set input to the value
                setQuantity(+val); // set the price to value
              } else setTempQuantity(""); //else set the input to empty
            }}
          />
        </div>
        <div>
          {/* unit input */}
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
          {/* price input */}
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
          {/* price total label */}
          <label className="text-center w-full h-full  m-auto mr-2 mt-5  text-lg">
            Total
          </label>
          <label className="text-center w-full h-full  m-auto mr-2 text-grey-3 mb-3 text-lg">
            {formatCurrency(+(price || 0) * +(quantity || 0))}

            {/* currency formatting */}
          </label>
        </div>
      </div>
      <label className="  text-lg mb-1">Category</label>
      {/* dropdown */}
      <DropDown
        options={categories}
        setSelectedCategory={setCategory}
        selectedCategory={category}
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
      {/* notes input */}
      <label className=" max-w-[90%] w-full text-lg mb-1">Notes</label>
      <textarea
        value={notes}
        className="w-[90%] h-40 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
        onChange={(e) => {
          setNotes(e.target.value);
        }}
      />
      {/* add to list button */}
      <Button
        onClick={async () => {
          if (currentItem === null) {
            await handleAddItemToList(item, setIsEmpty);
            //  clear all states
            setName("");
            setQuantity(0);
            setUnit("");
            setPrice(0);
            setCategory(categories[0]);
            setNotes("");
            setIsModalVisible(false);
          } else {
            itemAPI.handleItemUpdate(currentItem.id, {
              ...item,
              id: currentItem.id,
              checked: currentItem.checked, // add option to settings later to choose this mode
            });
            setCurrentItem(null);
            //  clear all states
            setName("");
            setQuantity(0);
            setUnit("");
            setPrice(0);
            setCategory(categories[0]);
            setNotes("");
            setIsModalVisible(false);
          }
        }}
        text={currentItem !== null ? "update item" : "Add Item to list"}
        style=" mb-4 mt-2 "
      ></Button>
    </Modal>
  );
}

// TODO: search
// TODO: more options popup
// TODO: fixed button at the bottom of page for when items need to be scrolled through
