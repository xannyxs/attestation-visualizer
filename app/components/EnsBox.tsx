import { EthereumAddress } from "../types";

interface InforCardProps {
  objectName: string;
  address: EthereumAddress;
  ens?: string;
}

export default function EnsBar({ objectName, address, ens }: InforCardProps) {
  if (address === "0x0000000000000000000000000000000000000000") {
    return (
      <>
        <div className="ml-4 font-bold">{objectName}</div>
        <div className="bg-gray-300 rounded mt-1 m-4">
          <a href="https://www.optimism.io/">
            <p className="truncate text-mg p-4 hover:bg-gray-400 hover:rounded">
              Optimism Foundation
            </p>
          </a>
        </div>
      </>
    );
  }

  if (!ens) {
    return (
      <>
        <div className="ml-4 font-bold">Current address</div>
        <div className="bg-gray-300 rounded mt-1 m-4">
          <a href={`https://etherscan.io/address/${address}`}>
            <p className="truncate text-mg p-4 hover:bg-gray-400 hover:rounded">
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
          <p className="truncate text-mg p-4 hover:bg-gray-400 hover:rounded">
            {ens}
          </p>
        </a>
      </div>
    </>
  );
}
