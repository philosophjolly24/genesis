import useItemCount from "../(hooks)/useItemCount";

interface CheckedItemCountProps {
  listID: string;
}
export default function CheckedItemCount({ listID }: CheckedItemCountProps) {
  const itemCount = useItemCount(listID)?.length;

  return (
    <>
      <p>
        {2}/{itemCount}
      </p>
    </>
  );
}
