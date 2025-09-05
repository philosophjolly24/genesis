"use client";

import Image from "next/image";
import listAPI from "./(listService)/api";
import { useState } from "react";

export default function Home() {
  const ViewAllLists = listAPI.ViewAllLists;
  const CreateNewList = listAPI.CreateNewList;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emojisVisible, setEmojisVisible] = useState(false);
  return (
    <>
      <CreateNewList
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      ></CreateNewList>
      <h1 className="font-open-sans text-[38px] font-extrabold text-brand text-center block mb-10">
        Genesis
      </h1>
      <button
        className="bg-brand font-nunito-sans w-48 h-12 block m-auto rounded-md "
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        <div className="bg-brand flex flex-row  h-full items-center justify-center rounded-md">
          <Image
            width={24}
            height={24}
            src={"cross.svg"}
            alt={"cross-img"}
            className="mr-1"
          ></Image>
          <label className="text-white font-medium text-[20px] pr-2">
            Create a new list
          </label>
        </div>
      </button>
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1">
        Your shopping lists
      </h1>
      <ViewAllLists></ViewAllLists>
    </>
  );
}
