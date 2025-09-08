"use client";
// Imports
import Image from "next/image";
import { databaseAPI } from "../../(database)/api/api";
import { useLiveQuery } from "dexie-react-hooks";
import { useRef, useState } from "react";
import ListIconPicker from "../../(components)/ListIcon";
import Link from "next/link";
import ProgressBar from "../../(components)/ProgressBar";
import CheckedItemCount from "../../(components)/CheckedItemCount";

export default function ViewAllLists() {
  const lists = useLiveQuery(() => databaseAPI.getAllLists()) || [];
  //   ?debugging
  console.log(lists);

  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const popoverRef = useRef(null);
  return (
    <>
      {lists.length < 1 ? (
        <>
          <Image
            width={76}
            height={76}
            src={"no-lists.svg"}
            alt="No-lists"
            className="object-cover max-w-90 max-h-90 w-[80%] h-[80%] m-auto pt-5"
          ></Image>
          <p className="m-auto w-full text-center text-lg">
            created lists will appear here
          </p>
        </>
      ) : (
        <ul>
          {lists.map((list) => (
            <li
              key={list.id}
              className="flex flex-col h-19  w-[90%] m-auto gap-1 mb-5 shadow-list rounded-md"
            >
              <div className="flex flex-row w-[90%] m-auto mb-0 items-center justify-between rounded-sm mt-2 grow">
                <ListIconPicker
                  list_id={list.id ?? ""}
                  ListEmojiIcon={list.emoji ?? "🛒"}
                  ref={popoverRef}
                ></ListIconPicker>
                <Link href={`../../${list.id}`} className="grow max-w-[50%]">
                  <p className=" block text-lg font-nunito-sans grow ml-3 mr-3 text-left max-h-7 w-fill truncate">
                    {list.name}
                  </p>
                </Link>
                <CheckedItemCount listID={list.id}></CheckedItemCount>
                <Image
                  width={16}
                  height={16}
                  alt="more-options"
                  src={"more-options-horizontal.svg"}
                  className="mr-3"
                ></Image>
              </div>
              {/* // TODO: progressbar comes here */}
              <ProgressBar></ProgressBar>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
