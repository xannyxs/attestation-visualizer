"use client";

import React, { useState, useCallback } from "react";
import SidebarComponent, {
  activeView,
} from "../components/Layout/SideBarComponent";
import ThreeGraph from "../components/ThreeGraphWrapper";
import { mainnet, WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import ListView from "../components/views/ListView";
import GridView from "../components/views/GridView";
import CreditsView from "../components/views/CreditsView";
import GraphDataProvider from "../components/context/GraphDataContext";
import RoundDropdown from "../components/RoundDropdown";
import { ActiveView } from "../types";
import useIsMobile from "../components/Layout/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [round, setRound] = useState(3);

  const handleSelectRound = useCallback((selectedRound: number) => {
    setRound(selectedRound);
    setDropdownOpen(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  const configWagmi = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  });

  if (isMobile) {
    return (
      <div className="flex justify-center text-white text-xl">
        Mobile version not supported.
      </div>
    );
  }

  return (
    <WagmiConfig config={configWagmi}>
      <GraphDataProvider round={round}>
        <main className="flex">
          <SidebarComponent />
          <div
            className={`w-[35rem] relative ${
              activeView.value === ActiveView.None ? "z-0" : "z-10"
            }`}
          >
            {activeView.value === ActiveView.Grid && <GridView />}
            {activeView.value === ActiveView.List && <ListView />}
            {activeView.value === ActiveView.Credits && <CreditsView />}
          </div>
          <RoundDropdown
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            round={round}
            handleSelectRound={handleSelectRound}
          />
          <div className="absolute">
            <ThreeGraph />
          </div>
        </main>
      </GraphDataProvider>
    </WagmiConfig>
  );
}
