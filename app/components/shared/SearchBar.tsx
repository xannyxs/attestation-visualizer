import React from "react";
import { Search } from "lucide-react";
import { signal } from "@preact/signals-react";

interface SearchBarProps {
  view: string;
  placeholder?: string;
}

export const searchQuery = signal("");

const SearchBar: React.FC<SearchBarProps> = ({
  view,
  placeholder = "Search an address...",
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchQuery.value = event.target.value;
  };

  return (
    <div className="sticky top-0 mx-2 border-b border-gray-300 pt-4 pb-3 bg-white flex justify-between items-center">
      <div className="text-3xl">{view}</div>
      <div className="flex justify-end items-center bg-gray-200 rounded">
        <input
          aria-label="Search addresses"
          type="text"
          placeholder={placeholder}
          className="m-1 p-1 border border-gray-300 rounded transition-all"
          onChange={handleSearchChange}
        />
        <Search className="m-2" />
      </div>
    </div>
  );
};

export default SearchBar;
