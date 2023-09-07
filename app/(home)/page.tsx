"use client";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import ThreeGraph from "../components/ThreeGraphWrapper";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

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
        <main>
          <ThreeGraph />
        </main>
      </WagmiConfig>
    </ApolloProvider>
  );
}
