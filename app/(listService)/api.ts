import CreateNewList from "./(components)/CreateNewList";
import ViewAllLists from "./(components)/ViewAllLists";
import { asyncSetListId, handleCreateNewList } from "./index";

const listAPI = {
  ViewAllLists,
  CreateNewList,
  handleCreateNewList,
  asyncSetListId,
};

export default listAPI;
