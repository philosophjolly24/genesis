"use client";

// * Imports
import { use, useEffect, useRef, useState } from "react";
import { databaseAPI, Item } from "../database/api/api";
import Button from "../components/Button";
import ItemCard from "../itemService/components/ItemCard";
import ProgressBar from "../components/ProgressBar";
import ListSummary from "../itemService/components/ListSummary";
import { itemAPI } from "../itemService/api";
import { ItemContext } from "../context/appContext";
import ContextMenu from "../components/ContextMenu";
import Image from "next/image";
import ItemModal from "../itemService/components/ItemModal";
import ListOptions from "../listService/components/ListOptions";
import SearchBar from "../components/Searchbar";

// NOTE: Home component
export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [query, setQuery] = useState("");
  const { items, itemsChecked, list, listID } = use(ItemContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [allItems, setAllItems] = useState<Item[] | undefined>(items);
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

  useEffect(() => {
    const search = async () => {
      const filteredItems = await databaseAPI.filterListItems(
        listID ?? "",
        query
      );
      setAllItems(filteredItems);
      return filteredItems;
    };

    if (query.trim() !== "") {
      search();
    } else setAllItems(items);
  }, [query, listID, items]);

  if (!items) return null; // * if null then the items are still loading
  if (itemsChecked == undefined) return null; // * if null then there are no checked items
  if (listID == undefined) return null; // * if null then there are no checked items

  const listTotal = itemAPI.getListTotalPrice(items);

  // * if list is found/loaded

  if (list !== null && list !== undefined)
    return (
      <>
        <ItemModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
        {/* 
        // #:-------------------  Feature: Progress bar  ------------------- //
      */}
        <div className="mb-4 sticky">
          <ProgressBar listID={listID}></ProgressBar>
        </div>
        {/* 
        // #:-------------------  Feature:  List heading bar  ------------------- //
      */}
        <div className="flex items-center justify-center pb-10 gap-4">
          <h1 className="font-open-sans text-3xl font-[550] m-auto text-center  m-a text-black-1 truncate pl-4 pr-4">
            {list.name}
          </h1>
          <Image
            width={24}
            height={24}
            src={"search.svg"}
            alt="search"
            onClick={() => {
              setIsExpanded(!isExpanded);
              console.log(isExpanded);
              setQuery("");
            }}
            className={
              `cursor-pointer transition-opacity duration-300 `
              // ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
            }
          ></Image>
          <SearchBar
            inputRef={inputRef}
            setQuery={setQuery}
            query={query}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          ></SearchBar>
          <ContextMenu
            content={({ close }) =>
              ListOptions({
                close,
                allItems: allItems || [],
                setAllItems,
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
          {allItems?.map((item) => {
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
        {/* 
          // #:-------------------  Feature: Add item to list  ------------------- //
        */}
        <Button
          onClick={() => {
            setIsModalVisible(true);
          }}
          text={"Add Item"}
          style=" fixed bottom-20 left-0 right-0"
        ></Button>
        {/* 
          // #:-------------------  List summary  ------------------- //
        */}
        <ListSummary listTotal={listTotal}></ListSummary>
        {/*
          // * if there are no lists  
        */}
        {items.length == 0 ? (
          <p className="m-auto w-full text-center mt-50">
            add some items to your list to get started
          </p>
        ) : null}
      </>
    );
}
