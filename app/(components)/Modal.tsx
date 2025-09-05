import { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalProps {
  height: number;
  children: ReactNode;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({
  height,
  children,
  isModalVisible,
  setIsModalVisible,
}: ModalProps) {
  return isModalVisible ? (
    <div
      className="bg-black-4/70 inset-0 absolute flex items-center justify-center z-10"
      onClick={(e) => {
        e.stopPropagation();
        setIsModalVisible(false);
      }}
    >
      <div
        className={`w-[90%] h-${height} bg-background-white m-auto  rounded-sm flex flex-col items-center z-20`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  ) : null;
}
