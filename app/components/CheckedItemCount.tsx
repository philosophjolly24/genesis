import useCheckedItemCount from "../hooks/useCheckedItemCount";
import useItemCount from "../hooks/useItemCount";

interface CheckedItemCountProps {
  listID: string;
}
export default function CheckedItemCount({ listID }: CheckedItemCountProps) {
  const itemCount = useItemCount(listID)?.length;
  const checkedItemCount = useCheckedItemCount(listID)?.length;

  return (
    <>
      <p>
        {checkedItemCount}/{itemCount}
      </p>
    </>
  );
}
