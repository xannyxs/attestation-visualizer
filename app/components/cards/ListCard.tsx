import { EthereumAddress } from "@/app/types";

export default function ListCard({
  address,
  image,
  referredBy,
}: {
  address: EthereumAddress;
  image: string;
  referredBy: EthereumAddress;
}) {
  return (
    <div className="shadow-black m-2 bg-gray-200 rounded-md flex items-start cursor-pointer hover:bg-red-100 hover:shadow-md transition-all">
      <img src={image} alt="avatar" className="rounded-md p-2 w-16 h-16" />
      <div className="ml-4 m-2 flex flex-col justify-between">
        <h2 className="text-md font-semibold truncate">Address: {address}</h2>
        <p className="text-gray-500 text-base truncate">
          Referred By: {referredBy}
        </p>
      </div>
    </div>
  );
}
