"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

const GraphSwitch = ({
  selectedRound,
  selectedGraph,
}: {
  selectedRound: number;
  selectedGraph: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-3 right-64 min-w-max z-10 p-2 w-96 bg-white rounded-sm">
        <span>Choose type of graph | Current graph: {selectedGraph} Graph</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <Link href={`/graph?graph=2d&round=${selectedRound}`}>
          <DropdownMenuItem className="cursor-pointer">
            2D Graph
          </DropdownMenuItem>
        </Link>
        <Link href={`/graph?graph=3d&round=${selectedRound}`}>
          <DropdownMenuItem className="cursor-pointer">
            3D Graph
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GraphSwitch;
