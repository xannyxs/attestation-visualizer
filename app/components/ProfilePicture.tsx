import Image from "next/image";
import { EthereumAddress } from "../types";

interface ProfilePictureProps {
  url?: string;
}

export async function fetchOptimismNFTImage(
  address: EthereumAddress,
): Promise<string> {
  try {
    const res = await fetch(`/api/fetchnft?address=${address}`);
    if (res.ok) {
      const data = await res.json();
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

export default function ProfilePicture({ url }: ProfilePictureProps) {
  const dimensions = 150;

  if (!url) {
    return <></>;
  }

  return (
    <div className="flex w-full justify-center mt-1 m-4">
      <Image
        className="rounded-full border-gray border-2"
        src={url}
        alt="Optimism NFT"
        width={dimensions}
        height={dimensions}
      />
    </div>
  );
}
