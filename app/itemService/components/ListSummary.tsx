import useCheckedItemCount from "../../hooks/useCheckedItemCount";
import useItemCount from "../../hooks/useItemCount";
import { formatCurrency } from "../../settings";

interface ListSummaryProps {
  listID: string;
  listTotal: number;
}

export default function ListSummary({ listID, listTotal }: ListSummaryProps) {
  const itemCount = useItemCount(listID);
  const checkedItemCount = useCheckedItemCount(listID);

  return (
    <div className=" flex fixed w-full items-center justify-between bottom-0 right-0 bg-background-white  border-t border-grey-2 rounded-md h-16 pl-3 pr-3">
      <div>
        <p className="">Completed</p>
        <p className="text-center text-black-4">{checkedItemCount}</p>
      </div>
      <div>
        <p>Remaining</p>
        <p className="text-center text-black-4">
          {itemCount - checkedItemCount}
        </p>
      </div>
      <div>
        <p> List total</p>
        <p className="text-center text-black-4">{formatCurrency(listTotal)}</p>
      </div>
    </div>
  );
}
