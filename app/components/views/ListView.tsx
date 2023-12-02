import { ICardProps as CardType, EthereumAddress } from "../../types";
import { useGraphData } from "../context/GraphDataContext";
import { useMemo } from "react";
import ListCard from "../cards/ListCard";
import makeBlockie from "ethereum-blockies-base64";
import ListCardSkeleton from "../cards/ListCardSkeleton";
import SearchBar, { searchQuery } from "../shared/SearchBar";
import { effect, signal } from "@preact/signals-react";
import { g_selectedNodeId } from "../ThreeGraph";

export default function ListView() {
  const graphDataContext = useGraphData();
  const addressHashMap = signal<Map<EthereumAddress, CardType> | null>(null);

  effect(() => {
    if (graphDataContext?.addressHashMap) {
      addressHashMap.value = graphDataContext.addressHashMap;
    }
  });

  const handleIconClick = (nodeId: string) => {
    g_selectedNodeId.value = nodeId;
  };

  const filteredCards = useMemo(() => {
    if (!addressHashMap.value) return [];

    return Array.from(addressHashMap.value.entries()).filter(([key, value]) => {
      const searchLower = searchQuery.value.toLowerCase();
      return (
        value.currentAddress.toLowerCase().includes(searchLower) ||
        (value.ens && value.ens.toLowerCase().includes(searchLower))
      );
    });
  }, [addressHashMap, searchQuery]);

  if (!addressHashMap.value) {
    return (
      <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
        <SearchBar view={"List view"} />

        {Array.from({ length: 16 }).map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <SearchBar view={"List view"} />

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
