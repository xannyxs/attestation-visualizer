import Image from "next/image";

const ProfilePicture = ({ url }: { url: string | undefined }) => {
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
