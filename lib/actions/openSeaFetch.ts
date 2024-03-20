"use server";

import { EthereumAddress } from "@/lib/types";

const openSeaFetch = async (address: EthereumAddress): Promise<string> => {
  try {
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
      return "";
    }

    const data = await response.json();
    const optimismNFT = data.nfts?.find(
      (nft: any) => nft.collection === "optimist-nft",
    );

    return optimismNFT ? optimismNFT.image_url : "";
  } catch (error) {
    console.error("An error occurred:", error);
    return "";
  }
};

export default openSeaFetch;
