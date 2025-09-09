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
        <label className="block mt-5 mb-4 font-open-sans text-2xl text-black-1 ">
          Enter your lists name:
        </label>
        <input
          type="text"
          name=""
          id=""
          className="w-[90%] h-8 rounded-[4px] mb-2 focus:outline-brand text-center text-lg border border-grey-2"
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
            className="bg-brand font-bold text-background-white text-xl w-34 h-10 rounded-sm tracking-wider"
            onClick={() => {
              setIsEmpty(false);
              setIsModalVisible(false);
              setListName("");
            }}
          >
            cancel
          </button>
          <button
            className="bg-brand font-bold text-background-white text-xl w-34 h-10 rounded-sm tracking-wider"
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
