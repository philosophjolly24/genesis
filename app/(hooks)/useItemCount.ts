import { useLiveQuery } from "dexie-react-hooks";
import { databaseAPI } from "../(database)/api/api";

export default function useItemCount(listID: string) {
  const items = useLiveQuery(async () => {
    const items = await databaseAPI.getAllItemsForList(listID);
    return items;
  });
  return items;
}
