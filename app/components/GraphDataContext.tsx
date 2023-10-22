'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import buildAddressHashMap from "../utils/buildAddressHashmap";
import { ICardProps as CardType, EthereumAddress } from "../types";

interface GraphDataContextType {
  graphData: any;
  addressHashMap: Map<EthereumAddress, CardType> | null;
}

const GraphDataContext = createContext<GraphDataContextType | null>(null);

export const useGraphData = () => useContext(GraphDataContext);

export default function GraphDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [graphData, setGraphData] = useState<any>(null);
  const [addressHashMap, setAddressHashMap] = useState<Map<
    EthereumAddress,
    CardType
  > | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetchgraph");
      const data = await response.json();
      setGraphData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (graphData) {
        const hashMap = await buildAddressHashMap(graphData);
        setAddressHashMap(hashMap);
      }

      fetchData();
    };
  }, [graphData]);

  return (
    <GraphDataContext.Provider value={{ graphData, addressHashMap }}>
      {children}
    </GraphDataContext.Provider>
  );
}
