import { ICardProps as CardType, EthereumAddress } from "../../types";
import { useGraphData } from "../context/GraphDataContext";
import { useState, useEffect, useContext } from "react";
import ListCard from "../cards/ListCard";
import makeBlockie from "ethereum-blockies-base64";
import ShowNodeCard from "../ShowNodeCard";
import { ModalContext } from "../context/modalContext";

export default function ListView() {
  const graphDataContext = useGraphData();
  const { openModal } = useContext(ModalContext);
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
        <span className="flex mt-10 justify-center text-3xl">Fetching...</span>
      </div>
    );
  }

  return (
    <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <div className="sticky top-0 flex pt-4 text-3xl justify-center border-b border-gray-300 pb-3 bg-white">
        List view
      </div>
      {Array.from(addressHashMap.entries()).map(([key, value]) => (
        <div
          key={key}
          onClick={() => {
            openModal(<ShowNodeCard cardInfo={value} />);
          }}
        >
          <ListCard
            address={value.ens ?? value.currentAddress}
            image={value.imageUrl || makeBlockie(value.currentAddress)}
            referredBy={value.referredBy}
          />
        </div>
      ))}
    </div>
  );
}
