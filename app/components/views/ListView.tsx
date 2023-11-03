import { ICardProps as CardType, EthereumAddress } from "../../types";
import { useGraphData } from "../context/GraphDataContext";
import { useState, useEffect } from "react";
import ListCard from "../cards/ListCard";
import makeBlockie from "ethereum-blockies-base64";
import { useSelectedNodeContext } from "../context/SelectedNodeContextProps";
import ListCardSkeleton from "../cards/ListCardSkeleton";
import { Search } from "lucide-react";

export default function ListView() {
  const { setSelectedNodeId } = useSelectedNodeContext();

  const graphDataContext = useGraphData();
  const [addressHashMap, setAddressHashMap] = useState<Map<
    EthereumAddress,
    CardType
  > | null>(null);
  useEffect(() => {
    if (graphDataContext) {
      const { addressHashMap } = graphDataContext;

      setAddressHashMap(addressHashMap);
    }
  }, [graphDataContext]);

  if (!addressHashMap) {
    return (
      <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
        <div className="sticky top-0 flex pt-4 text-3xl justify-center border-b border-gray-300 pb-3 bg-white">
          List view
        </div>
        {Array.from({ length: 16 }).map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const handleIconClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  return (
    <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <div className="sticky top-0 border-b border-gray-300 pt-5 pb-3 bg-white flex justify-between items-center">
        <div className="flex-grow text-3xl justify-center hidden sm:flex">
          List view
        </div>
        <div className="flex justify-end mr-2 p-2 hover:bg-gray-100">
          <Search />
        </div>
      </div>
      {Array.from(addressHashMap.entries()).map(([key, value]) => (
        <div key={key}>
          <ListCard
            image={value.imageUrl || makeBlockie(value.currentAddress)}
            card={value}
            onIconClick={() => handleIconClick(value.currentAddress)}
          />
        </div>
      ))}
    </div>
  );
}
