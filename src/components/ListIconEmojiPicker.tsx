// * Emoji picker component

// Imports
import { EmojiPicker } from "frimousse";
import type { Dispatch, SetStateAction } from "react";
import { databaseAPI } from "../database/api/api";

// Interfaces
interface ListIconEmojiPickerProps {
  isPickerVisible: boolean;
  setIsPickerVisible: Dispatch<SetStateAction<boolean>>;
  list_id: string;
}

// Main component
export default function ListIconEmojiPicker({
  isPickerVisible,
  setIsPickerVisible,
  list_id,
}: ListIconEmojiPickerProps) {
  return (
    <EmojiPicker.Root
      columns={7}
      className="isolate flex h-[368px] w-fit flex-col bg-grey rounded-md"
      onEmojiSelect={async ({ emoji }) => {
        setIsPickerVisible(!isPickerVisible);
        await databaseAPI.updateList(list_id, {
          emoji: emoji,
          updated_at: Date.now(),
        });
      }}
    >
      <EmojiPicker.Search className="z-10 mx-2 mt-2 appearance-none rounded-md bg-background-white px-2.5 py-2 text-sm" />
      <EmojiPicker.Viewport className="relative flex-1 outline-hidden ">
        <EmojiPicker.List
          className="select-none pb-1"
          components={{
            CategoryHeader: ({ category, ...props }) => (
              <div
                className="bg-grey px-3 pt-3 pb-1.5 font-medium text-black-1 text-xm"
                {...props}
              >
                {category.label}
              </div>
            ),
            Row: ({ children, ...props }) => (
              <div className="scroll-my-1.5 px-1.5" {...props}>
                {children}
              </div>
            ),
            Emoji: ({ emoji, ...props }) => (
              <button
                className="flex size-8 items-center justify-center rounded-md text-xl m-1 data-[active]:bg-neutral-100 dark:data-[active]:bg-neutral-800"
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </EmojiPicker.Viewport>
    </EmojiPicker.Root>
  );
}
