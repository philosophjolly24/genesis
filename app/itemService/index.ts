import { databaseAPI } from "../database/api/api";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../database/api/api";
import { notify } from "../util/notify";
import toast from "react-hot-toast";

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

const handleItemDelete = async (itemID: string) => {
  notify.emoji("item has been deleted", "🗑️");
  await databaseAPI.deleteItem(itemID);
};
const handleItemSortBy = (
  items: Item[],
  filters: string[],
  counter: number,
  setCounter: Dispatch<SetStateAction<number>>,
  setAllItems: Dispatch<SetStateAction<Item[] | undefined>>
) => {
  // set the filters

  console.log(counter, filters[counter]);

  if (filters[counter] === "name") {
    setAllItems(
      [...items].sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      })
    );
    notify.emoji("list sorted by name", "🎉");
    setCounter((count) => (count + 1) % filters.length);
  }

  if (filters[counter] === "category") {
    setAllItems(
      [...items].sort((a, b) => {
        return (a.category?.name.toLowerCase() || "").localeCompare(
          b.category?.name.toLowerCase() || ""
        );
      })
    );
    notify.emoji("list sorted by category", "🏷️");
    setCounter((count) => (count + 1) % filters.length);
  }

  if (filters[counter] === "price") {
    notify.emoji("list sorted by price", "💰");
    setAllItems(
      [...items].sort((a, b) => {
        return (a.price ?? 0) - (b.price ?? 0);
      })
    );
    setCounter((count) => (count + 1) % filters.length);
  }
};

const handleItemUncheck = (allItems: Item[], listID: string) => {
  databaseAPI.updateAllListItems(allItems, { checked: false }, listID);
};
const handleDeleteCheckedItems = (allItems: Item[]) => {
  const allCheckedItemIDs = allItems
    .filter((item) => item.checked === true)
    .map((item) => item.id);
  databaseAPI.deleteAllCheckedItems(allCheckedItemIDs);
};

export {
  handleAddItemToList,
  handleItemChecked,
  getListTotalPrice,
  handleItemUpdate,
  handleItemDelete,
  handleItemSortBy,
  handleItemUncheck,
  handleDeleteCheckedItems,
};
