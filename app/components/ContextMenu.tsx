import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ReactNode } from "react";

interface ContextMenuProps {
  children: ReactNode;
  content: (props: { close: () => void }) => ReactNode;
}

export default function ContextMenu({ children, content }: ContextMenuProps) {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <PopoverButton as="div">{children}</PopoverButton>
          <PopoverPanel anchor="top" className="flex flex-col ">
            {content({ close })}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
