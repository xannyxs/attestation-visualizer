import { useGraphData } from "../GraphDataContext";
import buildAddressHashMap from "../../utils/buildAddressHashmap";
import { ICardProps as CardType } from "../../types";
import { useState, useEffect } from "react";
import ListCard from "../cards/ListCard";
import makeBlockie from "ethereum-blockies-base64";

export default function ListView() {
  const graphDataContext = useGraphData();
  const [addressHashMap, setAddressHashMap] = useState<Map<string, CardType>>(
    new Map(),
  );

  let graphData: any;
  if (graphDataContext) {
    graphData = graphDataContext.graphData;
  }

  useEffect(() => {
    const fetchData = async () => {
      const newAddresses = await buildAddressHashMap(graphData);

      setAddressHashMap(newAddresses);
    };

    fetchData();
  }, [graphData]);

  return (
    <div className="relative bg-white h-full w-full overflow-y-auto max-h-[calc(100vh)]">
      <div className="sticky top-0 flex pt-4 text-3xl justify-center border-b border-gray-300 pb-3 bg-white z-10">
        List view
      </div>
      {Array.from(addressHashMap.entries()).map(async ([key, value]) => (
        <ListCard
          key={key}
          address={value.ens ?? value.currentAddress}
          image={value.imageUrl || makeBlockie(value.currentAddress)}
          referredBy={value.referredBy}
        />
      ))}
    </div>
  );
}
