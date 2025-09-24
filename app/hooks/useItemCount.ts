import { useLiveQuery } from "dexie-react-hooks";
import { databaseAPI } from "../database/api/api";
import { ItemContext } from "../context/appContext";
import { use } from "react";

export default function useItemCount() {
  const { items } = use(ItemContext);
  return items?.length ?? 0;
}
