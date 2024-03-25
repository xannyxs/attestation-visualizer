"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

const RoundDropdown = ({
  selectedRound,
  selectedGraph,
}: {
  selectedRound: number;
  selectedGraph: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-3 right-3 z-10 p-2 w-56 min-w-max bg-white rounded-sm">
        <span>Filter round | Current round: {selectedRound}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href={`/graph?graph=${selectedGraph}&round=2`}>
          <DropdownMenuItem className="cursor-pointer">
            Round 2
          </DropdownMenuItem>
        </Link>
        <Link href={`/graph?graph=${selectedGraph}&round=3`}>
          <DropdownMenuItem className="cursor-pointer">
            Round 3
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoundDropdown;
