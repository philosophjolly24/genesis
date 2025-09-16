"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <div
        className=" fixed flex gap-1 z-50 flex-col top-3 left-3"
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}
      >
        <Image
          width={38}
          height={38}
          src={isNavOpen ? "close-1.svg" : "hamburger-2.svg"}
          alt="hamburger-menu"
          className={`w-11 ml-3 fixed inset-0 mt-3`}
        ></Image>
      </div>

      <div
        className={`fixed inset-0 z-40 ${
          isNavOpen
            ? " bg-black-1/30 translate-y-0 h-screen w-screen"
            : "-translate-y-full"
        }`}
        onClick={() => {
          setIsNavOpen(!isNavOpen);
        }}
      >
        <div
          className={`fixed rounded-b-lg  transform transition-transform duration-500  z-40 ${
            isNavOpen
              ? " bg-background-white w-full h-[31%] translate-y-0 "
              : "-translate-y-full"
          }`}
        >
          <ul
            className="p-4 space-y-2 mb-3 flex flex-col gap-5 w-60 m-auto h-full font-[400]"
            onClick={() => {
              setIsNavOpen(!isNavOpen);
            }}
          >
            <Link
              href={"/"}
              className="flex items-center justify-between flex-row mt-9 gap-2 m-auto w-full"
            >
              <li
                className={` flex  gap-6 text-black-1  text-2xl grow m-auto items-center justify-center ${
                  isNavOpen ? "" : "hidden"
                }`}
              >
                <Image
                  width={32}
                  height={32}
                  src={"home.svg"}
                  alt="home"
                ></Image>
                <p className="block grow max-w-20">home</p>
              </li>
            </Link>
            <Link
              href={"/settings"}
              className="flex items-center justify-between flex-row gap-2 m-auto w-full"
            >
              <li
                className={` flex  gap-6 text-black-1  text-2xl grow m-auto items-center justify-center ${
                  isNavOpen ? "" : "hidden"
                }`}
              >
                <Image
                  width={32}
                  height={32}
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
              <li
                className={` flex  gap-6 text-black-1  text-2xl grow m-auto items-center justify-center ${
                  isNavOpen ? "" : "hidden"
                }`}
              >
                <Image
                  width={32}
                  height={32}
                  src={"trash.svg"}
                  alt="trash"
                ></Image>
                <p
                  className={`block grow max-w-20 ${isNavOpen ? "" : "hidden"}`}
                >
                  trash
                </p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
