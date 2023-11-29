import { ICardProps as CardType, EthereumAddress } from "../../types";
import { useGraphData } from "../context/GraphDataContext";
import { useState, useEffect, useMemo } from "react";
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
  const [searchbar, setSearchbar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (graphDataContext?.addressHashMap) {
      setAddressHashMap(graphDataContext.addressHashMap);
    }
  }, [graphDataContext?.addressHashMap]);

  const toggleSearchBar = () => setSearchbar(!searchbar);

  const filteredCards = useMemo(() => {
    if (!addressHashMap) return [];
    return Array.from(addressHashMap.entries()).filter(([key, value]) =>
      value.currentAddress.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [addressHashMap, searchQuery]);

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
        <div className="text-3xl ml-2">List view</div>
        <div className="flex justify-end items-center mr-2 bg-gray-200 rounded">
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
      {filteredCards.map(([key, value]) => (
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
