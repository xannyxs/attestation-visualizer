import { ICardProps as CardType, EthereumAddress } from "@/app/types";
import { useGraphData } from "../../context/GraphDataContext";
import { useState, useEffect, useMemo } from "react";
import makeBlockie from "ethereum-blockies-base64";
import { useSelectedNodeContext } from "../../context/SelectedNodeContextProps";
import GridCard from "./cards/GridCard";
import GridCardSkeleton from "./cards/GridCardSkeleton";
import SearchBar from "../../shared/SearchBar";

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
        <SearchBar view={"Grid view"} onChange={handleSearchChange} />

        <div className="grid grid-cols-2 gap-2 m-2">
          {Array.from({ length: 16 }).map((_, index) => (
            <GridCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  const handleIconClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  return (
    <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <SearchBar view={"Grid view"} onChange={handleSearchChange} />

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
