// * Emoji Icon Picker Component

// Imports
import { useState } from "react";
import { Popover } from "react-tiny-popover";
import ListIconEmojiPicker from "./ListIconEmojiPicker";

// Interfaces
interface ListIconProps {
  list_id: string;
  ListEmojiIcon: string;
}

// Main component
export default function ListIcon({ list_id, ListEmojiIcon }: ListIconProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Popover
        isOpen={isPickerVisible}
        positions={["bottom", "right"]} // preferred positions by priority
        onClickOutside={() => setIsPickerVisible(!isPickerVisible)}
        content={
          <div>
            {/* *emoji picker */}
            <ListIconEmojiPicker
              list_id={list_id}
              isPickerVisible={isPickerVisible}
              setIsPickerVisible={setIsPickerVisible}
            ></ListIconEmojiPicker>
          </div>
        }
        containerClassName="z-100"
      >
        {/* Where emoji is being displayed */}
        <div className=" flex items-center justify-center w-14 h-14 ml-3 rounded-sm text-center ">
          <p
            className="w-auto h-auto  m-auto rounded-sm text-center text-2xl "
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
