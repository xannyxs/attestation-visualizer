"use client";

import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { WagmiProvider } from "wagmi";
import useIsMobile from "@/components/Layout/useIsMobile";

const Home = () => {
  const isMobile = useIsMobile();

  const configWagmi = createConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(),
    },
  });

  if (isMobile) {
    return (
      <div className="flex justify-center text-xl text-white">
        Mobile version not supported.
      </div>
    );
  }

  return <WagmiProvider config={configWagmi}></WagmiProvider>;
};

export default Home;
