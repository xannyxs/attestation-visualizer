"use client";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import ThreeGraph from "../components/ThreeGraphWrapper";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import SideBar, { SidebarItem } from "../components/SideBar";
import { Gem, LayoutGrid, Rows } from "lucide-react";

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
              <SidebarItem icon={<LayoutGrid size={20} />} text="Grid" />
              <SidebarItem icon={<Rows size={20} />} text="List" active />
              <SidebarItem icon={<Gem size={20} />} text="Credits" />
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
