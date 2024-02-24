import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RoundDropdown = ({
  round,
  handleSelectRound,
}: {
  round: number;
  handleSelectRound: (round: number) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-3 right-3 z-10 p-2 w-60 bg-white rounded-sm">
        Filter round | Current round: {round}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuItem onClick={() => handleSelectRound(2)}>
          Round 2
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelectRound(3)}>
          Round 3
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoundDropdown;
