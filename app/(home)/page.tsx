"use client";

import SidebarComponent from "../components/Layout/SideBarComponent";
import ThreeGraph from "../components/ThreeGraphWrapper";
import { mainnet, WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { useState } from "react";
import ListView from "../components/views/ListView";
import GridView from "../components/views/GridView";
import CreditsView from "../components/views/CreditsView";

export default function Home() {
  const [activeView, setActiveView] = useState<
    "grid" | "list" | "credits" | "bug" | "feature" | "none"
  >("none");

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
        <div className="absolute">
          <ThreeGraph />
        </div>
      </main>
    </WagmiConfig>
  );
}
