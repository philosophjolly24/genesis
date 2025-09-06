import { v7 as uuidv7 } from "uuid";
import { databaseAPI } from "../(database)/api/api";
import { Dispatch, SetStateAction } from "react";

interface Item {
  id: string;
  list_id: string; // foreign key
  name: string;
  category_id?: number; // foreign key
  quantity?: number;
  unit?: string;
  price?: number;
  notes?: string;
}

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
export { handleAddItemToList };
