import { EthereumAddress } from "@/lib/types";
import { Card } from "@/ui/card";

interface InforCardProps {
  objectName: string;
  object: EthereumAddress | string | number;
}

export default function InfoBar({ objectName, object }: InforCardProps) {
  if (!object) {
    return <></>;
  }

  return (
    <>
      <span className="ml-4 font-bold">{objectName}</span>
      <Card className="m-4 mt-1 bg-gray-300 rounded">
        <p className="p-4 truncate text-mg">{object}</p>
      </Card>
    </>
  );
}
