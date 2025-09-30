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
  // *-------------------  List Operations  ------------------- //

  // INFO: create a new list
  addList: async (list: List) => {
    return await db.lists.add(list);
  },

  // INFO: Delete a list
  deleteList: async (listId: string) => {
    return await db.lists.delete(listId);
  },

  // INFO: Read a list
  getList: async (listId: string) => {
    return await db.lists.get(listId);
  },
  // Read all lists (use with useLiveQuery)
  getAllLists: () => db.lists.toArray(),

  // INFO: Update a list
  updateList: async (listId: string, updatedList: Partial<List>) => {
    const updated = await db.lists.update(listId, updatedList);
    if (updated) notify.success(`The list was updated successfully`);
    else
      notify.error(
        `Nothing was updated - there was no list with the id: ${listId}`
      );
    return updated;
  },
  // *---------------------------------------------------------------//

  // *-------------------  Item Operations  ------------------- //

  // INFO: Add an item
  addItem: async (item: Item) => {
    return await db.items.add(item);
  },

  // INFO: Delete an item
  deleteItem: async (itemId: string) => {
    return await db.items.delete(itemId);
  },

  // INFO: Delete all items related with a list (used when deleting a list)
  deleteALlLItemsForList: async (itemId: string[]) => {
    try {
      const deleted = await db.items.bulkDelete(itemId);
      notify.success("list moved to trash");
      return deleted;
    } catch (err) {
      notify.error(`error: ${err}`);
    }
  },

  // INFO: Delete all checked items (used for batch item deletions)
  deleteAllCheckedItems: async (itemId: string[]) => {
    try {
      const deleted = await db.items.bulkDelete(itemId);
      notify.success("all checked items have been deleted");
      return deleted;
    } catch (err) {
      notify.error(`error: ${err}`);
    }
  },

  // INFO: Read a item
  getItem: async (itemId: string) => {
    return await db.items.get(itemId);
  },

  // INFO: Read for all items related with specified list
  getAllItemsForList: async (listId: string) => {
    const items = await db.items.where("list_id").equals(listId).toArray();

    return items.sort((a, b) => Number(a.checked) - Number(b.checked)) ?? [];
  },
  // INFO: Reads for all checked items on a list
  getAllCheckedListItems: (listId: string) => {
    // return the query to that you can use it in useLiveQuery
    return db.items
      .where("list_id")
      .equals(listId)
      .and((item) => item.checked === true)
      .toArray();
  },

  // INFO: filters list items based on a specific query
  filterListItems: (listId: string, query: string) => {
    return db.items
      .where("list_id")
      .equals(listId)
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .toArray();
  },

  // INFO: Update a item
  updateItem: async (itemId: string, updatedItem: Partial<Item>) => {
    const updated = await db.items.update(itemId, updatedItem);
    if (updated) return null;
    else
      notify.error(
        `Nothing was updated - there was no item with the id: ${itemId}`
      );
    return updated;
  },

  // INFO: Update a group of items (used for changes like unchecking all items)
  updateAllListItems: async (
    allItems: Item[],
    updatedItem: Partial<Item>,
    listID: string
  ) => {
    const updated = await db.items.bulkUpdate(
      allItems.map((item) => {
        return { key: item.id, changes: updatedItem };
      })
    );
    // update the list updated_at field
    await databaseAPI.updateList(listID, { updated_at: Date.now() });

    if (updated) return null;
    else notify.error(`Nothing was updated - items could not be updated`);
    return updated;
  },

  //* ---------------------------------------------------------------//

  // *-------------------  List Sharing Operations  ------------------- //

  // INFO: import a list
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
