import toast from "react-hot-toast";
import { notify } from "../../util/notify";
import { List, Item } from "../database";
import { db } from "../database";
interface ListSchema {
  list: {
    name: string;
    id: string;
    emoji: string;
    created_at: number;
    updated_at: number;
  };

  items: Item[];
}

const databaseAPI = {
  // List Operations

  // Add new list
  addList: async (list: List) => {
    return await db.lists.add(list);
  },

  // Delete a specific list
  deleteList: async (listId: string) => {
    return await db.lists.delete(listId);
  },

  // Retrieve a list
  getList: async (listId: string) => {
    return await db.lists.get(listId);
  },
  // Retrieve all lists (use with useLiveQuery)
  getAllLists: () => db.lists.toArray(),

  // Update a specific list
  updateList: async (listId: string, updatedList: Partial<List>) => {
    const updated = await db.lists.update(listId, updatedList);
    if (updated) notify.success(`The list was updated successfully`);
    else
      notify.error(
        `Nothing was updated - there was no list with the id: ${listId}`
      );
    return updated;
  },
  // ================================================ //

  // Item Operations

  // Add new item
  addItem: async (item: Item) => {
    return await db.items.add(item);
  },

  // Delete a specific item
  deleteItem: async (itemId: string) => {
    return await db.items.delete(itemId);
  },
  deleteALlLItemsForList: async (itemId: string[]) => {
    try {
      const deleted = await db.items.bulkDelete(itemId);
      notify.success("list moved to trash");
      return deleted;
    } catch (err) {
      notify.error(`error: ${err}`);
    }
  },

  // Retrieve a item
  getItem: async (itemId: string) => {
    return await db.items.get(itemId);
  },
  // Retrieves all items for a target list
  getAllItemsForList: async (listId: string) => {
    const items = await db.items.where("list_id").equals(listId).toArray();

    return items.sort((a, b) => Number(a.checked) - Number(b.checked));
  },

  getAllCheckedListItems: (listId: string) => {
    // return the query to that you can use it in useLiveQuery
    return db.items
      .where("list_id")
      .equals(listId)
      .and((item) => item.checked === true)
      .toArray();
  },

  // Update a specific item
  updateItem: async (itemId: string, updatedItem: Partial<Item>) => {
    const updated = await db.items.update(itemId, updatedItem);
    if (updated) notify.success(`The item was updated successfully`);
    else
      notify.error(
        `Nothing was updated - there was no item with the id: ${itemId}`
      );
    return updated;
  },
  // ================================================ //
  addImportedList: async (importedList: ListSchema) => {
    try {
      await db.lists.add(importedList.list);

      await db.items.bulkAdd(importedList.items);
      notify.success(
        `list added successfully, ${importedList.items.length} items were added`
      );
    } catch (err) {
      console.error(err);
    }
  },
};

export { databaseAPI };
export type { List, Item, ListSchema };

// TODO: add try catch blocks
// TODO: add toast notifications (notify)
