import { v7 as uuidv7 } from "uuid";
import { databaseAPI, List } from "../(database)/api/api";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../(database)/api/api";

const handleAddItemToList = (
  item: Item,
  setIsEmpty: Dispatch<SetStateAction<boolean | null>>
) => {
  // validate all fields
  try {
    if (item.name.trim() == "") {
      setIsEmpty(true);
      return;
    }
    if (item.list_id.trim() == "") {
      throw new Error("list not found ");
    }

    // add item to table
    databaseAPI.addItem(item);
  } catch (err) {
    console.error(err);
  }
};

// item count for the checked items progress bar

export { handleAddItemToList };
