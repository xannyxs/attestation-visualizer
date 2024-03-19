import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

const GraphSwitch = ({
  selectedGraph,
  handleSelectedGraph,
}: {
  selectedGraph: boolean;
  handleSelectedGraph: (SelectedGraph: boolean) => void;
}) => {
  const graphText = selectedGraph ? "3DGraph" : "2DGraph";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute top-3 right-64 min-w-max z-10 p-2 w-96 bg-white rounded-sm">
        <span>Choose type of graph | Current graph: {graphText}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuItem onClick={() => handleSelectedGraph(false)}>
          2D Graph
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelectedGraph(true)}>
          3D Graph
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GraphSwitch;
