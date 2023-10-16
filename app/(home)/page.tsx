"use client";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import ThreeGraph from "../components/ThreeGraphWrapper";
import SideBar, { SidebarItem } from "../components/SideBar";
import { Gem, LayoutGrid, Rows, Bug, Rocket } from "lucide-react";
import GraphDataProvider from "../components/GraphDataContext";
import { useState } from "react";
import ListView from "../components/views/ListView";
import GridView from "../components/views/GridView";
import CreditsView from "../components/views/CreditsView";

export default function Home() {
  const [activeView, setActiveView] = useState<
    "grid" | "list" | "credits" | "bug" | "feature" | "none"
  >("none");
  const configWagmi = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  });

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

  return (
    <GraphDataProvider>
      <WagmiConfig config={configWagmi}>
        <main className="flex">
          <div className="w-[1/4] z-20 relative">
            <SideBar>
              <SidebarItem
                icon={<LayoutGrid size={20} />}
                text="Grid view"
                active={activeView === "grid"}
                onClick={() => handleItemClick("grid")}
              />
              <SidebarItem
                icon={<Rows size={20} />}
                text="List view"
                active={activeView === "list"}
                onClick={() => handleItemClick("list")}
              />
              <SidebarItem
                icon={<Gem size={20} />}
                text="Credits"
                active={activeView === "credits"}
                onClick={() => handleItemClick("credits")}
              />
              <SidebarItem
                icon={<Bug size={20} />}
                text="Report bug"
                onClick={() =>
                  handleRoute(
                    "https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=bug_report.md",
                  )
                }
              />
              <SidebarItem
                icon={<Rocket size={20} />}
                text="Feature request"
                onClick={() =>
                  handleRoute(
                    "https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=feature_request.md",
                  )
                }
              />
            </SideBar>
          </div>
          <div className="w-[40rem] z-10 relative">
            {activeView === "grid" && <GridView />}
            {activeView === "list" && <ListView />}
            {activeView === "credits" && <CreditsView />}
          </div>
          <div className="absolute inset-0">
            <ThreeGraph />
          </div>
        </main>
      </WagmiConfig>
    </GraphDataProvider>
  );
}
