import Dexie, { type EntityTable } from "dexie";

interface Item {
  id: string;
  list_id: string; // foreign key
  price?: number;
  unit?: string;
  quantity?: number;
  name: string;
  notes?: string;
  checked: boolean;
  category?: {
    id: number;
    name: string;
  };
}
interface List {
  id: string;
  emoji?: string;
  name: string;
  created_at: number;
  updated_at: number;
}

const db = new Dexie("GenesisDB") as Dexie & {
  lists: EntityTable<
    List,
    "id" // primary key "id"
  >;
  items: EntityTable<
    Item,
    "id" // primary key "id"
  >;
};

// Schema declaration:
db.version(2).stores({
  categories: "++id, name",
  lists: "id, name,created_at,updated_at",
  items: "id,list_id,name,notes,checked,price,quantity,unit",
});

export type { List, Item };
export { db };
