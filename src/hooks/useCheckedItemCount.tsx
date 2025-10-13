import { useLiveQuery } from "dexie-react-hooks";
import { databaseAPI } from "../database/api/api";

export default function useCheckedItemCount(listID: string) {
  const items = useLiveQuery(async () => {
    if (!listID) return;
    const items = await databaseAPI.getAllCheckedListItems(listID);
    return items;
  }, [listID]);
  return items?.length ?? 0;
}
