import { EthereumAddress } from "../types";

interface InforCardProps {
  objectName: string;
  address: EthereumAddress | string;
  ens?: string;
}

export default function EnsBar({ objectName, address, ens }: InforCardProps) {
  if (!ens) {
    return (
      <>
        <div className="ml-4 font-bold">{objectName}</div>
        <div className="bg-gray-300 rounded mt-1 m-4">
          <a href={`https://etherscan.io/address/${address}`}>
            <p className="truncate text-mg p-4 hover:bg-gray-400 hover:rounded transition-all">
              {address}
            </p>
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="ml-4 font-bold">{objectName}</div>
      <div className="bg-gray-300 rounded mt-1 m-4">
        <a href={`https://app.ens.domains/${ens}`}>
          <p className="truncate text-mg p-4 hover:bg-gray-400 hover:rounded transition-all">
            {ens}
          </p>
        </a>
      </div>
    </>
  );
}
