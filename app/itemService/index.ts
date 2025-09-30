import { databaseAPI } from "../database/api/api";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../database/api/api";
import { notify } from "../util/notify";

type Filters = "name" | "category" | "price";

// INFO: adds an item to list
const handleAddItemToList = async (
  item: Item,
  items: Item[],
  setIsEmpty: Dispatch<SetStateAction<boolean | null>>
) => {
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

// INFO: handle the item checked event
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

// INFO: gets the total of all the items in a list
const getListTotalPrice = (items: Item[]) =>
  items?.reduce((acc, curr) => {
    if (curr.price !== undefined) {
      if (curr.quantity !== undefined) return acc + curr.price * curr.quantity;
    }
    return acc;
  }, 0) ?? 0;

// INFO: handles the update event of an item
const handleItemUpdate = async (itemID: string, item: Item, listID: string) => {
  await databaseAPI.updateItem(itemID, item);
  // update the list updated_at field
  await databaseAPI.updateList(listID, { updated_at: Date.now() });
};

// INFO: handles the delete event of an item
const handleItemDelete = async (itemID: string) => {
  notify.emoji("item has been deleted", "🗑️");
  await databaseAPI.deleteItem(itemID);
};

// INFO: sorts the item based on given filters
const handleItemSortBy = (
  items: Item[],
  filters: Filters[],
  counter: number,
  setCounter: Dispatch<SetStateAction<number>>,
  setAllItems: Dispatch<SetStateAction<Item[] | undefined>>
) => {
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
// INFO: unchecks all items in a list
const handleItemUncheck = (allItems: Item[], listID: string) => {
  databaseAPI.updateAllListItems(allItems, { checked: false }, listID);
};

// INFO: deletes all checked items in list
const handleDeleteCheckedItems = (allItems: Item[]) => {
  const allCheckedItemIDs = allItems
    .filter((item) => item.checked === true)
    .map((item) => item.id);
  databaseAPI.deleteAllCheckedItems(allCheckedItemIDs);
};
//* ------------------------------------------------------------ //

//* -------------------  Exports   ------------------- //
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
export type { Filters };
