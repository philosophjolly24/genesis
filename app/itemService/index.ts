import { databaseAPI } from "../database/api/api";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../database/api/api";
import { notify } from "../util/notify";

const handleAddItemToList = async (
  item: Item,
  items: Item[],
  setIsEmpty: Dispatch<SetStateAction<boolean | null>>
) => {
  // validate all fields
  try {
    if (item.name.trim() == "") {
      setIsEmpty(true);
      return;
    }
    // add item to table
    await databaseAPI.addItem(item);
  } catch (err) {
    console.error(err);
    notify.error("an error occurred!");
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
};

export {
  handleAddItemToList,
  handleItemChecked,
  getListTotalPrice,
  handleItemUpdate,
};
