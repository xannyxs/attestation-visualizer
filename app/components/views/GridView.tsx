import { ICardProps as CardType, EthereumAddress } from "../../types";
import { useGraphData } from "../context/GraphDataContext";
import { useState, useEffect, useMemo } from "react";
import makeBlockie from "ethereum-blockies-base64";
import { useSelectedNodeContext } from "../context/SelectedNodeContextProps";
import ListCardSkeleton from "../cards/ListCardSkeleton";
import { Search } from "lucide-react";
import GridCard from "../cards/GridCard";

export default function ListView() {
  const { setSelectedNodeId } = useSelectedNodeContext();

  const graphDataContext = useGraphData();
  const [addressHashMap, setAddressHashMap] = useState<Map<
    EthereumAddress,
    CardType
  > | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (graphDataContext?.addressHashMap) {
      setAddressHashMap(graphDataContext.addressHashMap);
    }
  }, [graphDataContext?.addressHashMap]);

  const filteredCards = useMemo(() => {
    if (!addressHashMap) return [];
    return Array.from(addressHashMap.entries()).filter(([key, value]) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        value.currentAddress.toLowerCase().includes(searchLower) ||
        (value.ens && value.ens.toLowerCase().includes(searchLower))
      );
    });
  }, [addressHashMap, searchQuery]);

  if (!addressHashMap) {
    return (
      <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
        <div className="sticky top-0 mx-2 border-b border-gray-300 pt-4 pb-3 bg-white flex justify-between items-center">
          <div className="text-3xl">Grid view</div>
          <div className="flex justify-end items-center bg-gray-200 rounded">
            <input
              aria-label="Search addresses"
              type="text"
              placeholder="Search an address..."
              className="m-1 p-1 border border-gray-300 rounded transition-all"
              onChange={handleSearchChange}
            />
            <Search className="m-2" />
          </div>
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
      <div className="sticky top-0 mx-2 border-b border-gray-300 pt-4 pb-3 bg-white flex justify-between items-center">
        <div className="text-3xl">Grid view</div>
        <div className="flex justify-end items-center bg-gray-200 rounded">
          <input
            aria-label="Search addresses"
            type="text"
            placeholder="Search an address..."
            className="m-1 p-1 border border-gray-300 rounded transition-all"
            onChange={handleSearchChange}
          />
          <Search className="m-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 m-2">
        {filteredCards.map(([key, value]) => (
          <div key={key}>
            <GridCard
              image={value.imageUrl || makeBlockie(value.currentAddress)}
              card={value}
              onIconClick={() => handleIconClick(value.currentAddress)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
