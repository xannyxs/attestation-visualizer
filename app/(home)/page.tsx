"use client";

import ThreeGraph from "../components/ThreeGraphWrapper";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

export default function Home() {
  const client = new ApolloClient({
    uri: "https://optimism.easscan.org/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <main>
        <ThreeGraph />
      </main>
    </ApolloProvider>
  );
}
