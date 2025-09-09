import useCheckedItemCount from "../hooks/useCheckedItemCount";
import useItemCount from "../hooks/useItemCount";

interface ProgressBarProps {
  listID: string;
}

export default function ProgressBar({ listID }: ProgressBarProps) {
  const itemCount = useItemCount(listID)?.length;
  const checkedItemCount = useCheckedItemCount(listID)?.length;

  if (itemCount === undefined || checkedItemCount === undefined) return null;

  const progress = itemCount > 0 ? (checkedItemCount / itemCount) * 100 : 0;

  return (
    <>
      <div className=" bg-grey w-[90%] m-auto h-[6px] mb-2 block rounded">
        <div
          className={` bg-brand h-[6px]  mb-2 block rounded transition-all delay-50 duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
}
