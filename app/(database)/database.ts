import Dexie, { type EntityTable } from "dexie";

interface Category {
  id: string;
  name: string;
}
interface Item {
  id: string;
  list_id?: string; // foreign key
  category_id?: number; // foreign key
  price?: number;
  unit?: string;
  quantity?: number;
  name?: string;
  notes?: string;
}
interface List {
  id: string;
  emoji?: string;
  name: string;
  created_at: number;
  updated_at: number;
}

const db = new Dexie("GenesisDB") as Dexie & {
  categories: EntityTable<
    Category,
    "id" // primary key "id"
  >;
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
db.version(1).stores({
  categories: "++id, name",
  lists: "id, name,created_at,updated_at",
  items: "id,list_id,category_id,quantity,name,notes",
});

export type { Category, List, Item };
export { db };
