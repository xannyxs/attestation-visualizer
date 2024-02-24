import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  view: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onChange,
  view,
  placeholder = "Search an address...",
}) => {
  return (
    <div className="sticky top-0 mx-2 border-b border-gray-300 pt-4 pb-3 bg-white flex justify-between items-center">
      <div className="text-3xl">{view}</div>
      <div className="flex justify-end items-center bg-gray-200 rounded">
        <input
          aria-label="Search addresses"
          type="text"
          placeholder={placeholder}
          className="m-1 p-1 border border-gray-300 rounded transition-all"
          onChange={onChange}
        />
        <Search className="m-2" />
      </div>
    </div>
  );
};

export default SearchBar;
