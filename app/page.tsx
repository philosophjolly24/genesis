"use client";

import listAPI from "./listService/api";
import { useState } from "react";
import Button from "./components/Button";
import { ListTransferAPI } from "./listTransfer/api";
import JSZip from "jszip";

// INFO: The home page
export default function Home() {
  // NOTE: importing the components from the  listService  API
  const ViewAllLists = listAPI.ViewAllLists;
  const CreateNewList = listAPI.ListModal;

  const [isModalVisible, setIsModalVisible] = useState(false); // * state for modal window


  return (
    <>
      {/* 
        // #:-------------------  Feature:  Creating a new list   ------------------- //
      */}
      <CreateNewList
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      ></CreateNewList>

      {/* 
      // *** the button that toggles the CreateNewList modal
      */}
      <Button
        style="h-16 w-[60%] max-w-60"
        onClick={() => {
          setIsModalVisible(true);
        }}
        text="Create a new list"
      ></Button>
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1">
        Your shopping lists
      </h1>
      {/* 
      // NOTE: Where all the users lists will be displayed 
       */}
      <ViewAllLists></ViewAllLists>
      {/* 
      // ? Testing the file upload
    
      */}
      <input
        type="file"
        accept=".zip"
        onChange={(e) => {
          ListTransferAPI.handleFileImport(e);
        }}
      />
      <button
        onClick={() =>
          ListTransferAPI.handleListExport(
            "019918a4-a240-76df-a833-c7506e118b76"
          )
        }
      >
        export list testing
      </button>
    </>
  );
}
