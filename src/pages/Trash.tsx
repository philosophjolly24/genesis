import { useState } from "react";
import { databaseAPI, type TrashedList } from "../database/api/api";
import Modal from "../components/Modal";
import { useLiveQuery } from "dexie-react-hooks";
import { ListTransferAPI } from "../listTransfer/api";
import { notify } from "../util/notify";
import { Toaster } from "react-hot-toast";

export default function Trash() {
  const allTrashedLists =
    useLiveQuery(() => databaseAPI.getALlTrashedLists()) || [];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentList, setCurrentList] = useState<TrashedList | null>(null);

  return (
    <>
      <Toaster></Toaster>
      <Modal
        height={60}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <h1 className="font-open-sans text-3xl font-[550] mx-auto text-center text-brand truncate px-4 my-4 ">
          {` ${currentList?.list.emoji} ${currentList?.list.name}`}
        </h1>
        <div className="w-[90%]">
          <p className="text-lg w-full">
            {`Created on: `}
            <strong className="text-grey-3 font-normal">
              {`${new Date(
                currentList?.list.created_at ?? Date.now()
              ).toDateString()}`}
            </strong>
          </p>
          <p className=" text-lg w-full">
            {`Deleted on: `}
            <strong className="text-grey-3 font-normal">
              {`${new Date(
                currentList?.deleted_at ?? Date.now()
              ).toDateString()}`}
            </strong>
          </p>
          <p className="text-lg text-left w-full">
            {`Items on list: `}
            <strong className="text-grey-3 font-normal">
              {`${currentList?.items.length ?? 0}`} items
            </strong>
          </p>
        </div>
        <div className="flex flex-row gap-4 items-center justify-end my-3">
          <div className="flex flex-col items-center justify-center">
            <img
              src={"restore.svg"}
              width={30}
              height={30}
              alt="restore"
              onClick={async () => {
                if (currentList) {
                  await ListTransferAPI.handleListRestore(
                    {
                      list: currentList.list,
                      items: currentList.items,
                    },
                    currentList.id
                  );
                  setIsModalVisible(!isModalVisible);
                } else notify.error("no list has been selected");
              }}
            ></img>
            <p className="">restore</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <img
              src={"delete.svg"}
              width={32}
              height={32}
              alt="delete"
              onClick={async () => {
                await ListTransferAPI.handleListDelete(currentList?.id ?? "");
                setIsModalVisible(!isModalVisible);
              }}
            ></img>
            <p>delete</p>
          </div>
        </div>
      </Modal>
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center  m-a text-black-1 truncate pl-4 pr-4">
        Trash
      </h1>

      {allTrashedLists.length < 1 ? (
        <>
          {/* 
          // * Visible when user has no lists
          */}

          <img
            width={48}
            height={48}
            src={"trash.svg"}
            alt="trash icon"
            className="object-cover max-w-70 max-h-70 w-[80%] h-[80%] m-auto mt-10"
          ></img>
          <p className="m-auto w-full text-center text-lg my-10">
            deleted lists will appear here
          </p>
        </>
      ) : (
        // * where all trash lists are displayed
        <ul>
          {allTrashedLists.map((list) => (
            <li
              key={list.id}
              className="flex flex-col w-[95%] m-auto mb-3 items-center justify-between rounded-sm mt-5 grow shadow-list gap-4"
              onClick={() => {}}
            >
              <div className=" flex flex-row w-full items-center justify-center h-12">
                <div className="flex grow items-center justify-center">
                  <p className=" h-10 w-8 text-2xl">{list.list.emoji}</p>
                  <p
                    className=" block text-2xl font-nunito-sans  ml-3 mr-3  w-fill h-10 truncate text-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalVisible(!isModalVisible);
                      setCurrentList(list);
                    }}
                  >
                    {list.list.name}
                  </p>
                </div>

                <div className="flex flex-row gap-2 items-center justify-end pr-5">
                  <img
                    src={"restore.svg"}
                    width={20}
                    height={20}
                    alt="restore"
                    onClick={async () => {
                      await ListTransferAPI.handleListRestore(
                        {
                          list: list.list,
                          items: list.items,
                        },
                        list.id
                      );
                      setIsModalVisible(false);
                    }}
                  ></img>
                  <img
                    src={"delete.svg"}
                    width={24}
                    height={24}
                    alt="delete"
                    onClick={async () => {
                      setCurrentList(list);
                      await ListTransferAPI.handleListDelete(list.id ?? "");
                      setIsModalVisible(false);
                    }}
                  ></img>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
