import { EthereumAddress } from "../types";

interface InforCardProps {
  objectName: string;
  object: EthereumAddress | string | number;
}

export default function AddressBar({ objectName, object }: InforCardProps) {
  if (!object) {
    return <></>;
  }

  if (object === "0x0000000000000000000000000000000000000000") {
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

  return (
    <>
      <div className="ml-4 font-bold">{objectName}</div>
      <div className="bg-gray-300 rounded mt-1 m-4 hover:bg-gray-400 hover:rounded">
        <a href={`https://etherscan.io/address/${object}`}>
          <p className="truncate text-mg p-4">{object}</p>
        </a>
      </div>
    </>
  );
}
