"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import buildAddressHashMap from "@/lib/utils/buildAddressHashmap";
import {
  Attestation,
  ICardProps as CardType,
  EthereumAddress,
} from "@/lib/types";
import attestationFetch from "@/lib/actions/attestationFetch";

interface GraphDataContextType {
  graphData: Attestation[] | null;
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
  const [graphData, setGraphData] = useState<Attestation[] | null>(null);
  const [addressHashMap, setAddressHashMap] = useState<Map<
    EthereumAddress,
    CardType
  > | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await attestationFetch(round);
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
