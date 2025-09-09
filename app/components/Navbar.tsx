"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <div
        className=" flex gap-1 z-10 flex-col"
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}
      >
        <Image
          width={36}
          height={36}
          src={isNavOpen ? "close-1.svg" : "hamburger-2.svg"}
          alt="hamburger-menu"
          className={`w-9 ml-3 absolute inset-0 mt-3 `}
        ></Image>
      </div>
      <div
        className={`absolute inset-0  ${
          isNavOpen
            ? " bg-black-1/30 translate-y-0 h-screen w-screen"
            : "-translate-y-full"
        }`}
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}
      >
        <div
          className={`  rounded-b-lg  transform transition-transform duration-500 ${
            isNavOpen
              ? " bg-background-white w-full h-[25%] translate-y-0 "
              : "-translate-y-full"
          }`}
        >
          <ul
            className="p-4 space-y-2 mb-3  flex flex-col gap-5  w-60 m-auto"
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
          >
            <Link
              href={"/"}
              className="flex items-center justify-between flex-row mt-9 gap-2 m-auto w-full"
            >
              <li className=" flex  gap-4 text-black-1  text-xl grow m-auto items-center justify-center ">
                <Image
                  width={24}
                  height={24}
                  src={"home.svg"}
                  alt="home"
                ></Image>
                <p className="block grow max-w-20">home</p>
              </li>
            </Link>
            <Link
              href={"/settings"}
              className="flex items-center justify-between flex-row  gap-2 m-auto w-full"
            >
              <li className=" flex  gap-4 text-black-1  text-xl grow m-auto items-center justify-center">
                <Image
                  width={24}
                  height={24}
                  src={"settings.svg"}
                  alt="settings"
                ></Image>
                <p className="block grow max-w-20">settings</p>
              </li>
            </Link>
            <Link
              href={"/trash"}
              className="flex items-center justify-between flex-row  gap-2 m-auto w-full"
            >
              <li className=" flex  gap-4 text-black-1  text-xl grow m-auto items-center justify-center">
                <Image
                  width={24}
                  height={24}
                  src={"trash.svg"}
                  alt="trash"
                ></Image>
                <p className="block grow max-w-20">trash</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
