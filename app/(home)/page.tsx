"use client";

import SidebarComponent from "../components/Layout/SideBarComponent";
import ThreeGraph from "../components/ThreeGraphWrapper";
import { mainnet, WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { useState } from "react";
import ListView from "../components/views/ListView";
import GridView from "../components/views/GridView";
import CreditsView from "../components/views/CreditsView";
import GraphDataProvider from "../components/context/GraphDataContext";

export default function Home() {
  const [activeView, setActiveView] = useState<
    "grid" | "list" | "credits" | "bug" | "feature" | "none"
  >("none");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [round, setRound] = useState(3);

  const handleSelectRound = (selectedRound: number) => {
    setRound(selectedRound);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const handleItemClick = (view: typeof activeView) => {
    if (activeView === view) {
      setActiveView("none");
    } else {
      setActiveView(view);
    }
  };

  const handleRoute = (href: string) => {
    window.open(href, "_blank");
  };

  const configWagmi = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  });

  return (
    <WagmiConfig config={configWagmi}>
      <GraphDataProvider round={round}>
        <main className="flex">
          <SidebarComponent
            handleRoute={handleRoute}
            activeView={activeView}
            handleItemClick={handleItemClick}
          />
          <div
            className={`w-[35rem] relative ${
              activeView === "none" ? "z-0" : "z-10"
            }`}
          >
            {activeView === "grid" && <GridView />}
            {activeView === "list" && <ListView />}
            {activeView === "credits" && <CreditsView />}
          </div>
          <div className="text-white absolute top-0 right-0 z-10">
            <button onClick={toggleDropdown} className="p-2">
              Filter Round
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <button
                    onClick={() => handleSelectRound(2)}
                    className="text-gray-700 block px-4 py-2 text-sm"
                  >
                    Round 2
                  </button>
                  <button
                    onClick={() => handleSelectRound(3)}
                    className="text-gray-700 block px-4 py-2 text-sm"
                  >
                    Round 3 (Most recent)
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="absolute">
            <ThreeGraph />
          </div>
        </main>
      </GraphDataProvider>
    </WagmiConfig>
  );
}
