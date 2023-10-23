'use client'

import React, { createContext, useContext, useRef } from "react";

interface ThreeGraphContextProps {
  fgRef: any;
  // setFgRef: any;
}

const ThreeGraphContext = createContext<ThreeGraphContextProps | undefined>(
  undefined,
);

export const useThreeGraphContext = () => {
  const context = useContext(ThreeGraphContext);
  if (!context) {
    throw new Error(
      "useThreeGraphContext must be used within a ThreeGraphContextProvider",
    );
  }
  return context;
};

interface ThreeGraphContextProviderProps {
  children: React.ReactNode;
}

export const ThreeGraphContextProvider: React.FC<
  ThreeGraphContextProviderProps
> = ({ children }) => {
  const fgRef = useRef<any>(null);

  return (
    <ThreeGraphContext.Provider value={{ fgRef }}>
      {children}
    </ThreeGraphContext.Provider>
  );
};
