import { EthereumAddress } from "../types";

interface InforCardProps {
  objectName: string;
  object: EthereumAddress | string | number
}

export default function InfoBar({ objectName, object}: InforCardProps) {
  return (
    <>
      <div className="ml-4 font-bold">{objectName}</div>
      <div className="bg-gray-300 rounded mt-1 m-4">
        <a href={`https://etherscan.io/ensName/${object}`}>
          <p className="truncate text-mg p-4">{object}</p>
        </a>
      </div>
    </>
  );
}
