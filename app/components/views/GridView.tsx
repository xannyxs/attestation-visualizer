import { ICardProps as CardType, EthereumAddress } from "../../types";
import { useGraphData } from "../context/GraphDataContext";
import makeBlockie from "ethereum-blockies-base64";
import { useSelectedNodeContext } from "../context/SelectedNodeContextProps";
import GridCard from "../cards/GridCard";
import GridCardSkeleton from "../cards/GridCardSkeleton";
import SearchBar, { searchQuery } from "../shared/SearchBar";
import { signal, effect } from "@preact/signals-react";

export default function ListView() {
  const { setSelectedNodeId } = useSelectedNodeContext();
  const graphDataContext = useGraphData();

  const addressHashMap = signal<Map<EthereumAddress, CardType> | null>(null);

  effect(() => {
    if (graphDataContext?.addressHashMap) {
      addressHashMap.value = graphDataContext.addressHashMap;
    }
  });

  const handleIconClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const getFilteredCards = () => {
    if (!addressHashMap.value) return [];

    return Array.from(addressHashMap.value.entries()).filter(([key, value]) => {
      const searchLower = searchQuery.value.toLowerCase();
      return (
        value.currentAddress.toLowerCase().includes(searchLower) ||
        (value.ens && value.ens.toLowerCase().includes(searchLower))
      );
    });
  };

  const filteredCards = getFilteredCards();

  if (!addressHashMap.value) {
    return (
      <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
        <SearchBar view={"Grid view"} />

        <div className="grid grid-cols-2 gap-2 m-2">
          {Array.from({ length: 16 }).map((_, index) => (
            <GridCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <SearchBar view={"Grid view"} />

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
