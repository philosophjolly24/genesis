import { Item } from "../(database)/database";
import { databaseAPI } from "../(database)/api/api";
import { v7 as uuidv7 } from "uuid";

const itemAPI = {
  CreateItem: async (item: Partial<Item>) => {
    try {
      // validation for fields/ item
      if (item.name == undefined) {
        // error handling
        throw new Error("Field may not be empty");
      }
      if (item.name.trim() == "") {
        // error handling
        throw new Error("Enter a valid item name");
      }
      // retrieve current list_id from localstorage
      // ? (might using url parameter later)

      // add item to database
      await databaseAPI.addItem({
        id: uuidv7(),
        ...item,
      });
    } catch (error) {
      console.log(error);
    }
  },
  
};
export { itemAPI };
