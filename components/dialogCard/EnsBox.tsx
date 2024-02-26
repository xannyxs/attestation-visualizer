import { EthereumAddress } from "@/lib/types";
import { Card } from "@/ui/card";
import Link from "next/link";

interface InforCardProps {
  objectName: string;
  address: EthereumAddress | string;
  ens?: string;
}

export default function EnsBar({ objectName, address, ens }: InforCardProps) {
  if (!ens) {
    return (
      <>
        <span className="ml-4 font-bold">{objectName}</span>
        <Card className="m-4 mt-1 bg-gray-300 rounded">
          <Link href={`https://etherscan.io/address/${address}`}>
            <p className="p-4 transition-all hover:bg-gray-400 hover:rounded truncate text-mg">
              {address}
            </p>
          </Link>
        </Card>
      </>
    );
  }

  return (
    <>
      <span className="ml-4 font-bold">{objectName}</span>
      <Card className="m-4 mt-1 bg-gray-300 rounded">
        <Link href={`https://app.ens.domains/${ens}`}>
          <p className="p-4 transition-all hover:bg-gray-400 hover:rounded truncate text-mg">
            {ens}
          </p>
        </Link>
      </Card>
    </>
  );
}
