import Image from "next/image";
import { ListTransferAPI } from "../../listTransfer/api";

interface ListOptionsProps {
  listID: string;
  close?: () => void;
}
export default function ListOptions({ listID, close }: ListOptionsProps) {
  return (
    <>
      <div className="z-10 bg-background-white h-auto w-50 flex flex-col  rounded-md border-2 border-grey  mr-2">
        <div
          className=" flex border-b border-grey-2 h-15 text-lg align-center items-center gap-4"
          onClick={async () => {
            await ListTransferAPI.handleListExport(listID);
            close?.();
          }}
        >
          <Image
            width={32}
            height={32}
            src={"share.svg"}
            alt="share"
            className="ml-2"
          ></Image>{" "}
          <p className="grow  text-left"> download list</p>
        </div>

        <div
          className=" flex border-b border-grey-2 h-15 text-lg align-center items-center gap-4"
          onClick={() => {
            close?.();
          }}
        >
          <Image
            width={32}
            height={32}
            src={"sort.svg"}
            alt="sort"
            className="ml-2 "
          ></Image>{" "}
          <p className="grow  text-left"> sort by:</p>
        </div>

        <div
          className=" flex border-b border-grey-2 h-15 text-lg align-center items-center gap-4"
          onClick={() => {
            close?.();
          }}
        >
          <Image
            width={24}
            height={24}
            src={"uncheck.svg"}
            alt="uncheck"
            className="ml-2"
          ></Image>{" "}
          <p className="grow  text-left p2"> uncheck all items</p>
        </div>

        <button
          className="border-b border-grey-2  h-15 text-lg text-error-1 gap-3 font-semibold"
          onClick={() => {
            close?.();
          }}
        >
          delete checked items
        </button>
      </div>
    </>
  );
}
