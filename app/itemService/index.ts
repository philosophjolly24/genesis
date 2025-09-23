import { databaseAPI } from "../database/api/api";
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

const handleItemChecked = async (
  itemID: string,
  checkedState: boolean,
  listID: string
) => {
  await databaseAPI.updateItem(itemID, {
    checked: checkedState,
  });

  // update the list updated_at field
  await databaseAPI.updateList(listID, { updated_at: Date.now() });
};

const getListTotalPrice = (items: Item[]) =>
  items?.reduce((acc, curr) => {
    if (curr.price !== undefined) {
      if (curr.quantity !== undefined) return acc + curr.price * curr.quantity;
    }
    return acc;
  }, 0) ?? 0;

const handleItemUpdate = async (itemID: string, item: Item, listID: string) => {
  await databaseAPI.updateItem(itemID, item);
  // update the list updated_at field
  await databaseAPI.updateList(listID, { updated_at: Date.now() });
  return console.log("item " + itemID + " has been updated");
};

export {
  handleAddItemToList,
  handleItemChecked,
  getListTotalPrice,
  handleItemUpdate,
};
