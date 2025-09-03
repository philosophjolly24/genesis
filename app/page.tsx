import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="font-open-sans text-[38px] font-extrabold text-brand text-center block mb-10">
        Genesis
      </h1>
      <Link
        className="bg-brand font-nunito-sans w-48 h-12 block m-auto rounded-md "
        href={"#"}
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
      </Link>
      <h1 className="font-open-sans text-3xl font-[550] m-auto text-center pt-10 pb-10 m-a text-black-1">
        Your shopping lists
      </h1>
      
    </>
  );
}
