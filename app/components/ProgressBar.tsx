import useCheckedItemCount from "../hooks/useCheckedItemCount";
import useItemCount from "../hooks/useItemCount";

interface ProgressBarProps {
  listID: string;
}

export default function ProgressBar({ listID }: ProgressBarProps) {
  const itemCount = useItemCount(listID);
  const checkedItemCount = useCheckedItemCount(listID);

  const progress = itemCount > 0 ? (checkedItemCount / itemCount) * 100 : 0;

  return (
    <>
      <div className=" bg-grey w-[95%] m-auto h-[8px] mb-3 block rounded-md ">
        <div
          className={` bg-brand h-[8px]  mb-2 block rounded-md transition-all delay-50 duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
}
