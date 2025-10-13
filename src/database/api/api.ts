import { notify } from "../../util/notify";
import type { List, Item, TrashedList, ListSchema } from "../database";
import { db } from "../database";
import { v7 as uuidv7 } from "uuid";

const databaseAPI = {
  // *-------------------  List Operations  ------------------- //

  // INFO: create a new list
  addList: async (list: List) => {
    return await db.lists.add(list);
  },

  // TODO: refactor the  function
  trashList: async (listID: string) => {
    return await db.lists.delete(listID);
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

  // INFO: Delete all items related with a list (moves items and lists to the trash)
  MoveToTrash: async (listID: string = "") => {
    try {
      // get the items and list for a given id
      const list = await databaseAPI.getList(listID);
      const items = await databaseAPI.getAllItemsForList(listID);
      if (!list) return null;
      // add the list to the trash table
      await db.trash.add({ id: uuidv7(), deleted_at: Date.now(), list, items }); // items come here

      // delete the items and list from the items table
      await db.items.bulkDelete(items.map((item) => item.id));
      await db.lists.delete(listID);

      notify.success("list moved to trash");
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
  // *-------------------  Trash Operations  ------------------- //

  restoreList: async (deletedList: ListSchema, listID: string) => {
    try {
      await databaseAPI.addImportedList(deletedList);
      // delete the list after adding it
      await db.trash.delete(listID);
    } catch (err) {
      notify.error(`error: ${err}`);
    }
  },

  deleteList: async (listID: string) => {
    await db.trash.delete(listID);
    notify.success("list has been deleted");
  },

  getALlTrashedLists: () => db.trash.toArray(),

  getTrashedList: async (listId: string) => {
    return await db.trash.get(listId);
  },

  //* ---------------------------------------------------------------//
};
export { databaseAPI };
export type { List, Item, TrashedList, ListSchema };

//TODO: fix duplicate import error message
