import { ICardProps as CardType, EthereumAddress } from "@/lib/types";
import { useGraphData } from "../../context/GraphDataContext";
import { useState, useMemo } from "react";
import ListCard from "./cards/ListCard";
import makeBlockie from "ethereum-blockies-base64";
import { useSelectedNodeContext } from "../../context/SelectedNodeContextProps";
import ListCardSkeleton from "./cards/ListCardSkeleton";
import SearchBar from "@/components/misc/SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  useMemo(() => {
    if (graphDataContext?.addressHashMap) {
      setAddressHashMap(graphDataContext.addressHashMap);
    }
  }, [graphDataContext?.addressHashMap]);

  const filteredCards = useMemo(() => {
    if (!addressHashMap) return [];
    return Array.from(addressHashMap.entries()).filter(([_, value]) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        value.currentAddress.toLowerCase().includes(searchLower) ||
        (value.ens && value.ens.toLowerCase().includes(searchLower))
      );
    });
  }, [addressHashMap, searchQuery]);

  if (!addressHashMap) {
    return (
      <div className="relative bg-white h-full w-[35rem] overflow-y-auto max-h-[calc(100vh)]">
        <SearchBar view={"List view"} onChange={handleSearchChange} />

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
    <ScrollArea className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)] pr-1">
      <SearchBar view={"List view"} onChange={handleSearchChange} />

      {filteredCards.map(([key, value]) => (
        <div key={key}>
          <ListCard
            image={value.imageUrl || makeBlockie(value.currentAddress)}
            card={value}
            onIconClick={() => handleIconClick(value.currentAddress)}
          />
        </div>
      ))}
    </ScrollArea>
  );
}
