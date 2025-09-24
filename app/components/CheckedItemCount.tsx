import useCheckedItemCount from "../hooks/useCheckedItemCount";
import useItemCount from "../hooks/useItemCount";

export default function CheckedItemCount() {
  const itemCount = useItemCount();
  const checkedItemCount = useCheckedItemCount();

  return (
    <>
      <p className="text-xl text-grey-3">
        {checkedItemCount}/{itemCount}
      </p>
    </>
  );
}
