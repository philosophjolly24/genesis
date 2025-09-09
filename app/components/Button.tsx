"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  text: string;
  style?: string;
}

export default function Button({ onClick, text, style }: ButtonProps) {
  return (
    <button
      className={`bg-brand font-nunito-sans w-48 h-12 block m-auto rounded-md ${style}`}
      onClick={onClick}
    >
      <div
        className={`bg-brand flex flex-row  h-full items-center justify-center rounded-md `}
      >
        <Image
          width={24}
          height={24}
          src={"cross.svg"}
          alt={"cross-img"}
          className="mr-1"
        ></Image>
        <label className="text-white font-medium text-[20px] pr-2">
          {text}
        </label>
      </div>
    </button>
  );
}
