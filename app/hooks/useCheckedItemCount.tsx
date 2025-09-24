import { useLiveQuery } from "dexie-react-hooks";
import { databaseAPI } from "../database/api/api";
import { ItemContext } from "../context/appContext";
import { use } from "react";

export default function useCheckedItemCount() {
  const { listID } = use(ItemContext);
  const items = useLiveQuery(async () => {
    if (!listID) return;
    const items = await databaseAPI.getAllCheckedListItems(listID);
    return items;
  }, [listID]);
  return items?.length ?? 0;
}
