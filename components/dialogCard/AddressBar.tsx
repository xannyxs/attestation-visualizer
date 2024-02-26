import { EthereumAddress } from "@/lib/types";
import { Card } from "@/ui/card";
import { Link } from "lucide-react";

interface InforCardProps {
  objectName: string;
  object: EthereumAddress | string | number;
}

export default function AddressBar({ objectName, object }: InforCardProps) {
  if (!object) {
    return <></>;
  }

  return (
    <>
      <span className="ml-4 font-bold">{objectName}</span>
      <Card className="m-4 mt-1 bg-gray-300 rounded hover:bg-gray-400 hover:rounded">
        <Link href={`https://etherscan.io/address/${object}`}>
          <p className="p-4 truncate text-mg">{object}</p>
        </Link>
      </Card>
    </>
  );
}
