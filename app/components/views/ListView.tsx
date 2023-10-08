import { useGraphData } from "../GraphDataContext";
import buildAddressHashMap from "../../utils/buildAddressHashmap";
import { ICardProps as CardType } from "../../types";
import { useState, useEffect } from "react";
import ListCard from "../cards/ListCard";
import makeBlockie from "ethereum-blockies-base64";

export default function ListView() {
  const graphData = useGraphData();
  const [addressHashMap, setAddressHashMap] = useState<Map<string, CardType>>(
    new Map(),
  );

  useEffect(() => {
    const fetchData = async () => {
      if (graphData) {
        const newAddresses = await buildAddressHashMap(graphData);

        setAddressHashMap(newAddresses);
      }
    };

    fetchData();
  }, [graphData]);

  return (
    <div className="bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <div className="flex mt-3 text-3xl justify-center border-b border-gray-300 pb-3">
        List view
      </div>
      {Array.from(addressHashMap.entries()).map(([key, value]) => (
        <ListCard
          key={key}
          address={value.currentAddress}
          image={value.imageUrl || makeBlockie(value.currentAddress)}
          referredBy={value.referredBy}
        />
      ))}
    </div>
  );
}
