"use client";

import { useLiveQuery } from "dexie-react-hooks";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { databaseAPI, Item, List } from "../database/api/api";
import useCheckedItemCount from "../hooks/useCheckedItemCount";
import { useParams } from "next/navigation";

// Props for the provider
interface ItemProviderProps {
  children: ReactNode;
  params?: Promise<{ slug: string }>; // Keep as promise if needed
}

// Context type
interface ItemContextType {
  items: Item[] | undefined;
  itemsChecked: number;
  list?: List | null;
  setList?: Dispatch<SetStateAction<List | null>>;
  listID?: string;
  setListID?: Dispatch<SetStateAction<string>>;
  useSearch?: (query: string) => void;
  filteredItems?: Item[];
}

// Create context with default values
const ItemContext = createContext<ItemContextType>({
  items: undefined,
  itemsChecked: 0,
});

function ItemProvider({ children }: ItemProviderProps) {
  const [listID, setListID] = useState("");
  const [list, setList] = useState<List | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredItems, setFilteredItems] = useState<Item[] | undefined>(
    undefined
  );

  const params = useParams<{ slug: string }>();

  useEffect(() => {
    async function fetchListAndSetID() {
      // Check if the slug exists
      if (!params?.slug) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const fetchedList = await databaseAPI.getList(params.slug);
      if (fetchedList) {
        setList(fetchedList);
        setListID(fetchedList.id);
      }
      setIsLoading(false);
    }
    fetchListAndSetID();
  }, [params.slug]);

  // a conditional statement to prevent the useLiveQuery hook from running with an empty ID
  const items = useLiveQuery(() => {
    if (listID) {
      return databaseAPI.getAllItemsForList(listID);
    }
    return [];
  }, [listID]);

  const useSearch = (query: string) => {
    useEffect(() => {
      const filter = async () => {
        const items = await databaseAPI.filterListItems(listID, query);
        setFilteredItems(items);
      };
      filter();
    }, [query]);
  };

  const itemsChecked = useCheckedItemCount(listID);

  if (isLoading || items === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <ItemContext.Provider
      value={{
        items,
        itemsChecked,
        list,
        setList,
        listID,
        setListID,
        useSearch,
        filteredItems,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export { ItemContext, ItemProvider };
