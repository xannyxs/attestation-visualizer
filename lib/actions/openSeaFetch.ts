"use server";

import { EthereumAddress } from "@/lib/types";

const openSeaFetch = async (address: EthereumAddress) => {
  if (!process.env["OPENSEA_API"]) {
    throw new Error("Missing OPENSEA_API ENV variable");
  }

  if (!address) {
    throw new Error("Missing ETH Address");
  }

  const response = await fetch(
    `https://api.opensea.io/v2/chain/optimism/account/${address}/nfts`,
    {
      cache: "force-cache",
      headers: {
        "X-API-KEY": process.env["OPENSEA_API"],
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
};

export default openSeaFetch;
