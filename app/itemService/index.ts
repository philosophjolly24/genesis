import { v7 as uuidv7 } from "uuid";
import { databaseAPI, List } from "../database/api/api";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../database/api/api";

const handleAddItemToList = async (
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
    await databaseAPI.addItem(item);
  } catch (err) {
    console.error(err);
  }
};

// handle item checked event

const handleItemChecked = async (itemID: string, checkedState: boolean) => {
  await databaseAPI.updateItem(itemID, {
    checked: checkedState,
  });
};

const getListTotalPrice = (items: Item[]) =>
  items?.reduce((acc, curr) => {
    if (curr.price !== undefined) {
      if (curr.quantity !== undefined) return acc + curr.price * curr.quantity;
    }
    return acc;
  }, 0) ?? 0;

const handleItemUpdate = async (itemID: string, item: Item) => {
  await databaseAPI.updateItem(itemID, item);
  return console.log("item " + itemID + " has been updated");
};

export {
  handleAddItemToList,
  handleItemChecked,
  getListTotalPrice,
  handleItemUpdate,
};
