import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  view: string;
  placeholder?: string;
}

const SearchBar = ({
  onChange,
  view,
  placeholder = "Search an address...",
}: SearchBarProps) => {
  return (
    <div className="flex sticky top-0 justify-between items-center pt-4 pb-3 mx-2 bg-white border-b border-gray-300">
      <div className="text-3xl">{view}</div>
      <div className="flex justify-end items-center bg-gray-200 rounded">
        <Input
          type="text"
          placeholder={placeholder}
          className="rounded transition-all"
          onChange={onChange}
        />
        <Search className="m-2" />
      </div>
    </div>
  );
};

export default SearchBar;
