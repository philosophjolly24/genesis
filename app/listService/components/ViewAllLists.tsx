"use client";
// Imports
import Image from "next/image";
import { databaseAPI } from "../../database/api/api";
import { useLiveQuery } from "dexie-react-hooks";
import { Dispatch, SetStateAction, useState } from "react";
import ListIconPicker from "../../components/ListIcon";
import Link from "next/link";
import ProgressBar from "../../components/ProgressBar";
import CheckedItemCount from "../../components/CheckedItemCount";
import ContextMenu from "../../components/ContextMenu";
import Modal from "../../components/Modal";
import listAPI from "../api";

// INFO: Component that renders all the lists on the home page

export default function ViewAllLists() {
  // * ----------------------- states and hooks ------------------------------//
  const lists = useLiveQuery(() => databaseAPI.getAllLists()) || [];
  const [CurrentListId, setCurrentListId] = useState("");
  const [currentListName, setCurrentListName] = useState("");
  const [modalID, setModalID] = useState("false");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);

  return (
    <>
      {/* 
      //#:-------------------  FEATURE: delete list modal ---------------------//
       */}
      <DeleteModal
        modalID={modalID}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        isDeleteModalVisible={isDeleteModalVisible}
      ></DeleteModal>
      {/* 
      //#:-------------------  FEATURE: Rename list modal ---------------------//
       */}
      <RenameModal
        listName={currentListName}
        currentListID={modalID}
        isRenameModalVisible={isRenameModalVisible}
        setIsRenameModalVisible={setIsRenameModalVisible}
      ></RenameModal>

      {lists.length < 1 ? (
        <>
          {/* 
          // * Visible when user has no lists
          */}
          <Image
            width={76}
            height={76}
            src={"no-lists.svg"}
            alt="No-lists"
            className="object-cover max-w-90 max-h-90 w-[80%] h-[80%] m-auto pt-5"
          ></Image>
          <p className="m-auto w-full text-center text-lg">
            created lists will appear here
          </p>
        </>
      ) : (
        // * where all lists are displayed
        <ul>
          {lists.map((list) => (
            <li
              key={list.id}
              className="flex flex-col h-auto  w-[95%] m-auto gap-1 mb-5 shadow-list rounded-md"
            >
              <div className="flex flex-row w-[95%] m-auto mb-3 items-center justify-between rounded-sm mt-5 grow">
                {/* 
                // #: -------------------   FEATURE: Emoji   --------------------- //
                 */}
                <ListIconPicker
                  list_id={list.id ?? ""}
                  ListEmojiIcon={list.emoji ?? "🛒"}
                ></ListIconPicker>

                {/* 
                // #: FEATURE: Title
                 */}
                <Link href={`../../${list.id}`} className="grow max-w-[50%]">
                  <p className=" block text-xl font-nunito-sans grow ml-3 mr-3 text-left max-h-7 w-fill truncate">
                    {list.name}
                  </p>
                </Link>

                {/* 
                // #: -------------------  Feature: Item count  --------------------- //
                 */}
                <CheckedItemCount listID={list.id}></CheckedItemCount>

                {/* 
                // #:-------------------  Feature: Context menu  ------------------- //
                 */}
                <ContextMenu
                  content={({ close }) =>
                    ListContextMenu({
                      isDeleteModalVisible,
                      setIsDeleteModalVisible,
                      setModalID,
                      currentList: CurrentListId,
                      setIsRenameModalVisible,
                      isRenameModalVisible,
                      close,
                    })
                  }
                >
                  {/* 
                  // #:-------------------  Feature: More options menu  ------------------- //
                   */}
                  <Image
                    width={24}
                    height={24}
                    alt="more-options"
                    src={"more-options-horizontal.svg"}
                    className="mr-2"
                    onClick={() => {
                      setCurrentListId(list.id);
                      setCurrentListName(list.name);
                    }}
                  ></Image>
                </ContextMenu>
              </div>
              {/* 
                // #:-------------------  Feature: Progress bar  ------------------- //  
              */}
              <ProgressBar listID={list.id}></ProgressBar>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// INFO: The context menu that appears when you click the more options icon

interface ListContextMenuProps {
  isDeleteModalVisible?: boolean;
  setIsDeleteModalVisible: Dispatch<SetStateAction<boolean>>;
  isRenameModalVisible?: boolean;
  setIsRenameModalVisible: Dispatch<SetStateAction<boolean>>;
  setModalID: Dispatch<SetStateAction<string>>;
  currentList: string;
  close?: () => void;
}

function ListContextMenu({
  setIsDeleteModalVisible,
  isDeleteModalVisible,
  setModalID,
  setIsRenameModalVisible,
  currentList,
  isRenameModalVisible,
  close,
}: ListContextMenuProps) {
  return (
    <>
      <div className="z-10 bg-background-white h-auto w-50 flex flex-col  rounded-md shadow-list mb-4">
        <button
          className="border-b border-grey-2 h-15 text-lg"
          onClick={(e) => {
            if (e.currentTarget.innerText == "Rename list")
              setIsRenameModalVisible(!isRenameModalVisible);
            setModalID(currentList);
            close?.();
          }}
        >
          Rename list
        </button>
        <button className="border-b border-grey-2  h-15 text-lg">
          Pin list (?)
        </button>

        <button
          className="border-b border-grey-2  h-15 text-lg text-error-1"
          onClick={(e) => {
            if (e.currentTarget.innerText == "Delete list")
              setIsDeleteModalVisible(!isDeleteModalVisible);
            setModalID(currentList);
            close?.();
          }}
        >
          Delete list
        </button>
      </div>
    </>
  );
}

// INFO: The dialogue box for deleting a list
interface DeleteModalProps {
  modalID: string;
  isDeleteModalVisible: boolean;
  setIsDeleteModalVisible: Dispatch<SetStateAction<boolean>>;
}
function DeleteModal({
  modalID,
  setIsDeleteModalVisible,
  isDeleteModalVisible,
}: DeleteModalProps) {
  return (
    <Modal
      isModalVisible={isDeleteModalVisible}
      setIsModalVisible={setIsDeleteModalVisible}
      height={60}
    >
      <p className="text-[22px] pt-10 pb-12 w-[90%] text-center ">
        Move list to bin?
      </p>
      <div className="flex gap-4 mb-6 w-[90%]">
        <button
          className="bg-brand font-bold text-background-white text-2xl w-full h-13 rounded-sm tracking-wider"
          onClick={() => {
            setIsDeleteModalVisible(false);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-brand font-bold text-background-white text-2xl w-full h-13 rounded-sm tracking-wider"
          onClick={async () => {
            await listAPI.handleListTrash(modalID);
            setIsDeleteModalVisible(false);
          }}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}

// INFO: The modal that appears when renaming a list
interface RenameModalProps {
  isRenameModalVisible: boolean;
  setIsRenameModalVisible: Dispatch<SetStateAction<boolean>>;
  listName: string;
  currentListID: string;
}
function RenameModal({
  listName,
  currentListID,
  isRenameModalVisible,
  setIsRenameModalVisible,
}: RenameModalProps) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [modalInput, setModalInput] = useState("");

  return (
    <>
      <Modal
        height={68}
        isModalVisible={isRenameModalVisible}
        setIsModalVisible={setIsRenameModalVisible}
      >
        <label className="block mt-5 mb-4 font-open-sans text-[26px] text-black-1 truncate max-w-[90%]">
          {`Rename ${listName}`}
        </label>
        <input
          type="text"
          name=""
          id=""
          className="w-[90%] h-13 rounded-md mb-2 focus:outline-brand text-center  border border-grey-2 text-2xl"
          onChange={(e) => {
            setModalInput(e.target.value);
          }}
        />
        {isEmpty ? (
          <>
            <p className="text-error-1 font-semibold tracking-wider text-[15px] mb-4">
              field may not be empty
            </p>
          </>
        ) : null}
        <div className="w-[90%] flex gap-8 items-center justify-center mt-5 mb-4">
          <button
            className="bg-brand text-white text-2xl w-38 rounded-md h-13  tracking-wide"
            onClick={() => {
              setIsEmpty(false);
              setIsRenameModalVisible(false);
              setModalInput("");
            }}
          >
            Cancel
          </button>
          <button
            className="bg-brand text-white text-2xl w-38 rounded-md h-13  tracking-wide"
            onClick={() => {
              listAPI.handleListRename(modalInput, currentListID);
              setIsEmpty(false);
              setIsRenameModalVisible(false);
              setModalInput("");
              setIsRenameModalVisible(false);
            }}
          >
            Rename
          </button>
        </div>
      </Modal>
    </>
  );
}
