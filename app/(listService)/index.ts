import { Dispatch, SetStateAction } from "react";
import { databaseAPI } from "../(database)/api/api";
import { v7 as uuidv7 } from "uuid";
import { List } from "../(database)/api/api";

interface handleCreateNewListParams {
  listName: string;
  isEmpty?: boolean;
  isVisible?: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  setIsEmpty: Dispatch<SetStateAction<boolean>>;
}

// * handler function for creating a new list
const handleCreateNewList = async ({
  listName,
  setIsVisible,
  setIsEmpty,
}: handleCreateNewListParams) => {
  // INFO: check if list name is valid(cannot be empty)
  if (listName.trim() == "") {
    setIsEmpty(true); //* set the error state to true
    return;
  }

  // add the list to the database
  await databaseAPI.addList({
    id: uuidv7(),
    name: listName,
    created_at: Date.now(),
    updated_at: Date.now(),
    emoji: "🛒",
  });

  // close modal window
  setIsVisible(false);
};

// INFO: asyncSetListId: set the current list id to retrieve the list items
async function asyncSetListId(
  setListID: Dispatch<SetStateAction<string>>,
  setList: Dispatch<SetStateAction<List | null>>,
  params: Promise<{ slug: string }>,
  listID: string
) {
  setListID((await params).slug);
  setList((await databaseAPI.getList(listID)) ?? null);
}

export { handleCreateNewList, asyncSetListId };
