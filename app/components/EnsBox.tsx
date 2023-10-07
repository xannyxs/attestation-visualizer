import { useEnsName } from "wagmi";

interface InforCardProps {
  objectName: string;
  address: string;
}

export default function EnsBar({ objectName, address }: InforCardProps) {
  const ensName = useEnsName({ address: address as `0x${string}`, chainId: 1 });

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

  if (ensName.isError || !ensName.data || ensName.isLoading) {
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
        <a href={`https://app.ens.domains/${ensName.data}`}>
          <p className="truncate text-mg p-4 hover:bg-gray-400 hover:rounded">
            {ensName.data}
          </p>
        </a>
      </div>
    </>
  );
}
