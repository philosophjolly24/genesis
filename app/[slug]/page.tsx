"use client";

// * Imports
import { use, useEffect, useState } from "react";

import { Item } from "../database/api/api";
import Button from "../components/Button";
import ItemCard from "../itemService/components/ItemCard";
import ProgressBar from "../components/ProgressBar";
import ListSummary from "../itemService/components/ListSummary";
import { itemAPI } from "../itemService/api";
import { ItemContext } from "../context/appContext";
import ContextMenu from "../components/ContextMenu";
import Image from "next/image";
import { handleListExport } from "../listTransfer";
import ItemModal from "./components/ItemModal";
import ListOptions from "./components/ListOptions";

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
                listID,
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

// ! FIX: update the list updated_at field in the database on every item change
// ! FIX: context menu padding(maybe?)
// TODO: search
// TODO: more options popup
