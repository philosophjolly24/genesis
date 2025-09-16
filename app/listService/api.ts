import ListModal from "./components/CreateNewList";
import ViewAllLists from "./components/ViewAllLists";
import {
  asyncSetListId,
  handleCreateNewList,
  handleListDelete,
  handleListRename,
} from "./index";

const listAPI = {
  ViewAllLists,
  ListModal,
  handleCreateNewList,
  asyncSetListId,
  handleListDelete,
  handleListRename,
};

export default listAPI;
