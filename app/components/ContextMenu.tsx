import {
  Dispatch,
  JSX,
  ReactNode,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import { Popover } from "react-tiny-popover";

interface ContextMenuProps {
  isMenuVisible: boolean;
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  content?: any; //   eslint-disable-line @typescript-eslint/no-explicit-any
  listId: string;
}

export default function ContextMenu({
  children,
  isMenuVisible,
  setIsMenuVisible,
  content,
  listId: string,
}: ContextMenuProps) {
  return (
    <Popover
      isOpen={isMenuVisible}
      positions={["top", "bottom"]} // preferred positions by priority
      onClickOutside={() => setIsMenuVisible(!isMenuVisible)}
      content={content}
      containerClassName="z-10"
    >
      {/* the visible component will be here */}
      {children}
    </Popover>
  );
}
