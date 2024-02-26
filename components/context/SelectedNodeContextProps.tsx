"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface SelectedNodeContextProps {
  selectedNodeId: string | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectedNodeContext = createContext<SelectedNodeContextProps | undefined>(
  undefined,
);

export const useSelectedNodeContext = () => {
  const context = useContext(SelectedNodeContext);
  if (!context) {
    throw new Error(
      "useSelectedNodeContext must be used within a SelectedNodeContextProvider",
    );
  }
  return context;
};

export const SelectedNodeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <SelectedNodeContext.Provider value={{ selectedNodeId, setSelectedNodeId }}>
      {children}
    </SelectedNodeContext.Provider>
  );
};
