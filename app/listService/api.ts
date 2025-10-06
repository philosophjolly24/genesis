import ListModal from "./components/CreateNewList";
import ViewAllLists from "./components/ViewAllLists";
import {
  asyncSetListId,
  handleCreateNewList,
  handleListTrash,
  handleListRename,
} from "./index";

const listAPI = {
  ViewAllLists,
  ListModal,
  handleCreateNewList,
  asyncSetListId,
  handleListTrash,
  handleListRename,
};

export default listAPI;
