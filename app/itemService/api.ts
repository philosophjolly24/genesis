import {
  getListTotalPrice,
  handleAddItemToList,
  handleDeleteCheckedItems,
  handleItemChecked,
  handleItemSortBy,
  handleItemUncheck,
  handleItemUpdate,
} from ".";
import { handleListDelete } from "../listService";

const itemAPI = {
  handleAddItemToList,
  handleItemChecked,
  getListTotalPrice,
  handleItemUpdate,
  handleListDelete,
  handleItemSortBy,
  handleItemUncheck,
  handleDeleteCheckedItems,
};
export { itemAPI };
