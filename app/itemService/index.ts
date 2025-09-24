import { databaseAPI } from "../database/api/api";
import { Dispatch, SetStateAction, use } from "react";
import { Item } from "../database/api/api";
import { ItemContext } from "../context/appContext";
import toast from "react-hot-toast";
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
    if (item.list_id.trim() == "") {
      throw new Error("list not found ");
    }
    // check if item already exists
    const itemExists = items.find(
      (curItem) =>
        curItem.name === item.name.trim() && curItem.unit === item.unit
    );
    console.log("item exists", itemExists);
    // if item exists, update the items
    if (itemExists !== undefined) {
    }

    //else add item to table
    else await databaseAPI.addItem(item);
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
