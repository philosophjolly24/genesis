"use client";

import { v7 as uuidv7 } from "uuid";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { databaseAPI } from "../(database)/api/api";
import { itemAPI } from "../(itemService)";

export default function Home() {
  const lists = useLiveQuery(databaseAPI.getAllLists);
  const [ListName, setListName] = useState("");
  const [itemName, setItemName] = useState("");
  const [listID, setListID] = useState("");
  return (
    <>
      <p>Enter a list Name</p>
      <input
        className="border-2"
        type="text"
        onChange={(e) => {
          setListName(e.target.value);
          setItemName(e.target.value);
        }}
      />

      <p>Enter list ID</p>
      <input
        className="border-2"
        type="text"
        onChange={(e) => {
          setListID(e.target.value);
        }}
      />

      <button
        className="m-2 w-20 h-4 block"
        onClick={async () => {
          const list_id = uuidv7();
          localStorage.setItem("currentList", list_id);
          await databaseAPI.addList({
            id: list_id,
            name: ListName,
            created_at: Date.now(),
            updated_at: Date.now(),
          });
        }}
      >
        add list
      </button>

      <button
        className="m-2 w-20 h-4 block"
        onClick={async () => {
          try {
            await databaseAPI.deleteList(listID);
            console.log("list has been deleted successfully");
          } catch (error) {
            console.error("failed to delete list", error);
          }
        }}
      >
        delete list
      </button>

      <button
        className="m-2 w-20 h-4 block"
        onClick={async () => {
          try {
            const updatedList = await databaseAPI.updateList(listID, {
              name: ListName,
              updated_at: Date.now(),
            });
            console.log("list has been updated successfully");
            if (updatedList == 0) throw new Error("Could not update list");
          } catch (error) {
            console.error("An error has occurred, ", error);
          }
        }}
      >
        update list
      </button>
      <button
        className="m-2 w-20 h-4 block"
        onClick={async () => {
          const list_id = localStorage.getItem("currentList") ?? ""; // the nulllish coalescing operator
          await itemAPI.CreateItem({ list_id, name: itemName });
        }}
      >
        add item
      </button>
      <ul>
        <h2 className="text-2xl mt-4 mb-4">All Lists</h2>
        {lists?.map((list) => (
          <li key={list.id}>
            <h2>{list.name}</h2>
            <p>{list.id}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
