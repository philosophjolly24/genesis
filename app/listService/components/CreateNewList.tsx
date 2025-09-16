import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../components/Modal";
import listAPI from "../api";

interface CreateNewListProp {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}
export default function CreateNewList({
  isModalVisible,
  setIsModalVisible,
}: CreateNewListProp) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [listName, setListName] = useState("");

  return (
    <>
      <Modal
        height={68}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      >
        <label className="block mt-5 mb-4 font-open-sans text-[26px] text-black-1 font-semiboldbold  ">
          Enter your lists name:
        </label>
        <input
          type="text"
          name=""
          id=""
          className="w-[90%] h-13 rounded-md mb-2 focus:outline-brand text-center  border border-grey-2 text-2xl"
          onChange={(e) => {
            setListName(e.target.value);
          }}
        />
        {isEmpty ? (
          <>
            <p className="text-error-1 font-bold tracking-wider text-[15px] mb-4">
              field may not be empty
            </p>
          </>
        ) : null}
        <div className="w-[90%] flex gap-8 items-center justify-center mt-5 mb-4">
          <button
            className="bg-brand text-white text-2xl w-38 rounded-md h-13 font-semibold tracking-wide"
            onClick={() => {
              setIsEmpty(false);
              setIsModalVisible(false);
              setListName("");
            }}
          >
            cancel
          </button>
          <button
            className="bg-brand text-white text-2xl w-38 rounded-md h-13 font-semibold tracking-wide"
            onClick={() =>
              listAPI.handleCreateNewList({
                listName,
                setIsVisible: setIsModalVisible,
                setIsEmpty,
              })
            }
          >
            create
          </button>
        </div>
      </Modal>
    </>
  );
}
