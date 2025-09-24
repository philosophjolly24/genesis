import useCheckedItemCount from "../hooks/useCheckedItemCount";
import useItemCount from "../hooks/useItemCount";

interface CheckedItemCountProps {
  listID: string;
}
export default function CheckedItemCount({ listID }: CheckedItemCountProps) {
  const itemCount = useItemCount(listID);
  const checkedItemCount = useCheckedItemCount(listID);

  return (
    <>
      <p className="text-xl text-grey-3">
        {checkedItemCount}/{itemCount}
      </p>
    </>
  );
}
