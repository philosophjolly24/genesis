"use client";

import Image from "next/image";
import listAPI from "./(listService)/api";
import { useState } from "react";
import Button from "./(components)/Button";

export default function Home() {
  const ViewAllLists = listAPI.ViewAllLists;
  const CreateNewList = listAPI.CreateNewList;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emojisVisible, setEmojisVisible] = useState(false);
  return (
    <main className="w-full max-w-[1200px] m-auto pl-3 pr-3">
      <CreateNewList
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      ></CreateNewList>
      <h1 className="font-open-sans text-[38px] font-extrabold text-brand text-center block mb-10">
        Genesis
      </h1>
      <Button
        onClick={() => {
          setIsModalVisible(true);
        }}
        text="Create a new list"
      ></Button>
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1">
        Your shopping lists
      </h1>
      <ViewAllLists></ViewAllLists>
    </main>
  );
}
