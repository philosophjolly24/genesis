import { RefObject, useState } from "react";
import { Popover } from "react-tiny-popover";
import { databaseAPI } from "../(database)/api/api";
import ListIconEmojiPicker from "./ListIconEmojiPicker";

interface ListIconProps {
  list_id: string;
  ListEmojiIcon: string;
  ref: RefObject<null>;
}

export default function ListIcon({
  list_id,
  ListEmojiIcon,
  ref,
}: ListIconProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Popover
        isOpen={isPickerVisible}
        positions={["bottom", "right"]}
        onClickOutside={() => setIsPickerVisible(!isPickerVisible)}
        ref={ref} // preferred positions by priority
        content={
          <div>
            <ListIconEmojiPicker
              list_id={list_id}
              isPickerVisible={isPickerVisible}
              setIsPickerVisible={setIsPickerVisible}
              
            ></ListIconEmojiPicker>
          </div>
        }
        containerClassName="z-100"
      >
        <div className="w-8 h-8 bg-grey ml-3 rounded-sm text-center ">
          <p
            className="w-8 h-8 bg-grey  rounded-sm text-center text-2xl "
            onClick={(e) => {
              e.stopPropagation();
              setIsPickerVisible(!isPickerVisible);
            }}
          >
            {ListEmojiIcon}
          </p>
        </div>
      </Popover>
    </div>
  );
}
