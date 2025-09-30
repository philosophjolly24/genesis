import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { databaseAPI } from "../database/api/api";

interface searchBarProp {
  query: string;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  setQuery: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function SearchBar({
  query,
  isExpanded,
  setIsExpanded,
  setQuery,
  inputRef,
}: searchBarProp) {
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded, inputRef]);
  return (
    <>
      <input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        type="text"
        // onBlur={() => setIsExpanded(!isExpanded)}
        id=""
        ref={inputRef}
        value={query}
        className={`transition-all duration-500 ease-in-out h-10 bg-background-white rounded-md overflow-hidden  ${
          isExpanded
            ? `max-w-[140px] px-2 border-2  border-brand focus:outline-0`
            : `max-w-0 px-0 border-none`
        }`}
      />
    </>
  );
}
