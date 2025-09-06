import { Category, List, Item } from "../database";
import { db } from "../database";

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
    return await db.lists.update(listId, updatedList);
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

  // Retrieve a item
  getItem: async (itemId: string) => {
    return await db.items.get(itemId);
  },
  // Retrieves all items for a target list
  getAllItemsForList: (listId: string) => {
    // return the query to that you can use it in useLiveQuery
    return db.items.where("list_id").equals(listId).toArray();
  },

  // Update a specific list
  updateItem: async (itemId: string, updatedItem: Partial<Item>) => {
    const updated = await db.items.update(itemId, updatedItem);
    if (updated) console.log(`The list was updated successfully`);
    else
      console.log(
        `Nothing was updated - there was no list with the id: ${itemId}`
      );
    return updated;
  },
  // ================================================ //

  // Category Operations

  // Add new category
  addCategory: async (category: Category) => {
    return await db.categories.add(category);
  },

  // Delete a specific category
  deleteCategory: async (categoryId: string) => {
    return await db.categories.delete(categoryId);
  },

  // Retrieve a category
  getCategory: async (categoryId: string) => {
    return await db.categories.get(categoryId);
  },
  // Retrieve all categories (use with useLiveQuery)
  getAllCategories: async () => {
    return await db.categories.toArray();
  },

  // Update a specific category
  updateCategory: async (
    categoryId: string,
    updatedCategory: Partial<Category>
  ) => {
    return await db.categories.update(categoryId, updatedCategory);
  },

  // ================================================ //
};

export { databaseAPI };
