import { ICardProps as CardType, EthereumAddress } from "@/lib/types";
import { useState, useMemo } from "react";
import ListCard from "./cards/ListCard";
import makeBlockie from "ethereum-blockies-base64";
import { useSelectedNodeContext } from "../../context/SelectedNodeContextProps";
import SearchBar from "@/components/misc/SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ListView({
  addresses,
}: {
  addresses: Map<EthereumAddress, CardType>;
}) {
  const { setSelectedNodeId } = useSelectedNodeContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleIconClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const filteredCards = useMemo(() => {
    if (!addresses) return [];

    return Array.from(addresses.entries()).filter(([_, value]) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        value.currentAddress.toLowerCase().includes(searchLower) ||
        (value.ens && value.ens.toLowerCase().includes(searchLower))
      );
    });
  }, [addresses, searchQuery]);

  return (
    <ScrollArea className="relative bg-white h-full w-[35rem] overflow-y-auto max-h-[calc(100vh)] pr-1">
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
