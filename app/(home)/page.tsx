"use client";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import ThreeGraph from "../components/ThreeGraphWrapper";
import SideBar, { SidebarItem } from "../components/SideBar";
import { Gem, LayoutGrid, Rows, Bug, Rocket } from "lucide-react";
import GraphDataProvider from "../components/GraphDataContext";

export default function Home() {
  const configWagmi = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  });

  return (
    <GraphDataProvider>
      <WagmiConfig config={configWagmi}>
        <main className="flex">
          <div className="w-[1/4]">
            <SideBar>
              <SidebarItem icon={<LayoutGrid size={20} />} text="Grid view" />
              <SidebarItem icon={<Rows size={20} />} text="List view" />
              <SidebarItem icon={<Gem size={20} />} text="Credits" />
              <SidebarItem
                icon={<Bug size={20} />}
                text="Report bug"
                href="https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=bug_report.md"
              />
              <SidebarItem
                icon={<Rocket size={20} />}
                text="Feature request"
                href="https://github.com/xvoorvaa/attestation-visualizer/issues/new?assignees=&labels=&projects=&template=feature_request.md"
              />
            </SideBar>
          </div>
          <div className="w-3/4">
            <ThreeGraph />
          </div>
        </main>
      </WagmiConfig>
    </GraphDataProvider>
  );
}
