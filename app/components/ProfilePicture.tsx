import Image from "next/image";
import { useEnsAddress } from "wagmi";

interface ProfilePictureProps {
  url: string;
}

export default function ProfilePicture({ url }: ProfilePictureProps) {
  const dimensions = 100;

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
