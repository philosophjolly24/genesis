// * re-usable modal window component

// Imports
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Item } from "../database/api/api";

// Interfaces
interface ModalProps {
  height: number;
  children: ReactNode;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  setCurrentItem?: Dispatch<SetStateAction<Item | null>>;
  onClear?: () => void;
}

// Main component
export default function Modal({
  height,
  children,
  isModalVisible,
  setIsModalVisible,
  setCurrentItem,
  onClear,
}: ModalProps) {
  return isModalVisible ? (
    <div
      className="bg-black-4/70 inset-0 fixed flex items-center justify-center z-2000000"
      onClick={(e) => {
        e.stopPropagation();
        setIsModalVisible(false);
        if (setCurrentItem) setCurrentItem(null);
        if (onClear) onClear();
      }}
    >
      <div
        className={`w-[90%] h-${height} bg-background-white m-auto  rounded-sm flex flex-col items-center z-2000000`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
}
