"use client";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import ThreeGraph from "../components/ThreeGraphWrapper";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import SideBar, { SidebarItem } from "../components/SideBar";
import { Gem, LayoutGrid, Rows, Bug, Rocket } from "lucide-react";

export default function Home() {
  const client = new ApolloClient({
    uri: "https://optimism.easscan.org/graphql",
    cache: new InMemoryCache(),
  });

  const configWagmi = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: mainnet,
      transport: http(),
    }),
  });

  return (
    <ApolloProvider client={client}>
      <WagmiConfig config={configWagmi}>
        <main className="flex ">
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
    </ApolloProvider>
  );
}
