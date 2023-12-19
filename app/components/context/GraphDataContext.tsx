"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import buildAddressHashMap from "@/app/utils/buildAddressHashmap";
import { ICardProps as CardType, EthereumAddress } from "@/app/types";

interface GraphDataContextType {
  graphData: any;
  addressHashMap: Map<EthereumAddress, CardType> | null;
}

const GraphDataContext = createContext<GraphDataContextType | null>(null);

export const useGraphData = () => useContext(GraphDataContext);

export default function GraphDataProvider({
  children,
  round,
}: {
  children: ReactNode;
  round: number;
}) {
  const [graphData, setGraphData] = useState<any>(null);
  const [addressHashMap, setAddressHashMap] = useState<Map<
    EthereumAddress,
    CardType
  > | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/fetchAttestations?round=${round}`);
      if (!response.ok) {
        console.error("Something went wrong: ", response.status);
      }
      const data = await response.json();
      setGraphData(data);

      const hashMap = await buildAddressHashMap(data);
      setAddressHashMap(hashMap);
    };

    fetchData();
  }, [round]);

  return (
    <GraphDataContext.Provider value={{ graphData, addressHashMap }}>
      {children}
    </GraphDataContext.Provider>
  );
}
