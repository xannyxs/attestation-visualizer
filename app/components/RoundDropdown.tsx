import { Signal, signal } from "@preact/signals-react";
import React from "react";
import { g_round } from "./context/GraphDataContext";

export const g_isDropdownOpen = signal(false);

const RoundDropdown: React.FC<RoundDropdownProps> = () => {
  const toggleDropdown = () => {
    g_isDropdownOpen.value = !g_isDropdownOpen.value;
  };

  const handleSelectRound = (selectedRound: number) => {
    g_round.value = selectedRound;
    g_isDropdownOpen.value = false;
  };

  return (
    <div className="bg-white rounded-sm absolute top-3 right-3 z-10">
      <button
        onClick={() => toggleDropdown()}
        className="p-2 hover:bg-gray-100"
        aria-haspopup="true"
      >
        Filter round | Current round: {g_round.value}
      </button>
      {g_isDropdownOpen.value && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-md bg-white shadow-lg z-10"
          role="menu"
        >
          <button
            onClick={() => handleSelectRound(2)}
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:rounded-md w-full"
            role="menuitem"
          >
            Round 2
          </button>
          <button
            onClick={() => handleSelectRound(3)}
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:rounded-md w-full"
            role="menuitem"
          >
            Round 3 (Most recent)
          </button>
        </div>
      )}
    </div>
  );
};

export default RoundDropdown;
