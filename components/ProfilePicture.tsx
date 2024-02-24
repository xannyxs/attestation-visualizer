import Image from "next/image";
import { EthereumAddress } from "@/lib/types";
import openSeaFetch from "@/lib/actions/openSeaFetch";

export async function fetchOptimismNFTImage(
  address: EthereumAddress,
): Promise<string> {
  try {
    const data = await openSeaFetch(address);
    if (!data) {
      return "";
    }

    const optimismNFT = data.nfts?.find(
      (nft: any) => nft.collection === "optimist-nft",
    );

    return optimismNFT ? optimismNFT.image_url : "";
  } catch (error) {
    console.error("An error occurred:", error);
    return "";
  }
}

const ProfilePicture = ({ url }: { url?: string }) => {
  const dimensions = 150;

  if (!url) {
    return <></>;
  }

  return (
    <div className="flex justify-center mb-4 w-full">
      <Image
        className="rounded-full border-2 border-gray"
        src={url}
        alt="Optimism NFT"
        width={dimensions}
        height={dimensions}
      />
    </div>
  );
};

export default ProfilePicture;
