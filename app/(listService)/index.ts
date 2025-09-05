import { Dispatch, SetStateAction } from "react";
import { databaseAPI } from "../(database)/api/api";
import { v7 as uuidv7 } from "uuid";

interface handleCreateNewListParams {
  listName: string;
  isEmpty?: boolean;
  isVisible?: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setIsEmpty: Dispatch<SetStateAction<boolean>>;
}

const handleCreateNewList = async ({
  listName,
  setIsVisible,
  setIsEmpty,
}: handleCreateNewListParams) => {
  // check if list name is valid(cannot be empty)
  if (listName.trim() == "") {
    // send error if name is invalid
    setIsEmpty(true);
    return;
  }
  // create a new list
  //   const list_id = uuidv7() ;

  //   localStorage.setItem("currentList", list_id);
  await databaseAPI.addList({
    id: uuidv7(),
    name: listName,
    created_at: Date.now(),
    updated_at: Date.now(),
    emoji: "🛒",
  });
  // toggle the modal to disappear
  setIsVisible(false);
};

export { handleCreateNewList };
