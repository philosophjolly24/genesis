import { Dispatch, SetStateAction } from "react";
import { categories } from "./categories";

// Props for clearing input fields
interface ClearFieldsProps {
  setName: Dispatch<SetStateAction<string>>;
  setQuantity: Dispatch<SetStateAction<number>>;
  setUnit: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setCategory: Dispatch<
    SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  setNotes: Dispatch<SetStateAction<string>>;
  setTempPrice?: Dispatch<SetStateAction<string>>;
  setTempQuantity?: Dispatch<SetStateAction<string>>;
}

function clearListFields({
  setName,
  setCategory,
  setQuantity,
  setUnit,
  setPrice,
  setNotes,
  setTempPrice,
  setTempQuantity,
}: ClearFieldsProps) {
  setName("");
  setQuantity(0);
  setUnit("");
  setPrice(0);
  setCategory(categories[0]);
  setNotes("");
  if (setTempPrice) setTempPrice("");
  if (setTempQuantity) setTempQuantity("");
}
export { clearListFields };
