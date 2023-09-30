import { useState, useEffect } from "react";
import Image from "next/image";
import { EthereumAddress } from "../types";

interface ProfilePictureProps {
  address: EthereumAddress;
}

export async function fetchOptimismNFTImage(address: EthereumAddress): Promise<string> {
  try {
    const res = await fetch(`/api/fetchnft?address=${address}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data)
      const optimismNFT = data.nfts?.find(
        (nft: any) => nft.collection === "optimist-nft",
      );

      return optimismNFT ? optimismNFT.image_url : "";
    } else {
      console.log("Failed to fetch data. Status:", res.status);
      return "";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return "";
  }
}

export default function ProfilePicture({ address }: ProfilePictureProps) {
  const [url, setUrl] = useState<string>("");
  const dimensions = 150;

  useEffect(() => {
    const fetchData = async () => {
      const imageUrl = await fetchOptimismNFTImage(address);
      setUrl(imageUrl);
    };

    fetchData();
  }, [address]);

  return (
    <div className="flex w-full justify-center mt-1 m-4">
      {url ? (
        <Image
          className="rounded-full border-gray border-2"
          src={url}
          alt="Optimism NFT"
          width={dimensions}
          height={dimensions}
        />
      ) : (
        // Placeholder for when no image is found
        <div
          className="rounded-full border-gray border-2"
          style={{ width: dimensions, height: dimensions }}
        >
          No Image
        </div>
      )}
    </div>
  );
}
