"use client";

import { useEffect, useState } from "react";
import { databaseAPI } from "../(database)/api/api";

interface List {
  id?: string;
  emoji?: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export default function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [list, setList] = useState<List | null>(null);
  useEffect(() => {
    async function asyncList() {
      const { slug } = await params;
      setList((await databaseAPI.getList(slug)) ?? null);
    }
    asyncList();
  }, [params]);

  if (list !== null)
    return (
      <div>
        <h1>{list.name}</h1>
        <h1>Icon : {list.emoji}</h1>
        <h1>id: {list.id}</h1>
        <h1> Created on :{new Date(list.created_at).toString()}</h1>
      </div>
    );
}
