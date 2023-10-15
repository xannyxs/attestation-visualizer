import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const GraphDataContext = createContext<any>(null);

export const useGraphData = () => useContext(GraphDataContext);

export default function GraphDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetchgraph");
      const data = await response.json();
      setGraphData(data);
    };

    fetchData();
  }, []);

  return (
    <GraphDataContext.Provider value={graphData}>
      {children}
    </GraphDataContext.Provider>
  );
}
