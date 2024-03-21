"use server";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Boxes } from "lucide-react";
import attestationFetch from "@/lib/actions/attestationFetch";
import { redirect } from "next/navigation";
import buildAddressHashMap from "@/lib/utils/buildAddressHashmap";
import BadgeholdersChart from "./components/charts/BadgeholdersChart";

const Home = async ({
  searchParams,
}: {
  searchParams: {
    graph?: string;
    round?: number;
  };
}) => {
  const graphParam = searchParams.graph;
  const roundParam = searchParams.round;

  if (!roundParam || !graphParam) {
    redirect("/?graph=3d&round=3");
  }

  const graphData = await attestationFetch(roundParam);
  const addresses = await buildAddressHashMap(graphData);

  return (
    <div className="h-screen bg-white p-4 grid grid-rows-4 grid-cols-3 gap-4">
      <div className="bg-gray-200 row-span-4 col-span-1 p-4 flex flex-col justify-between">
        <Link href={"/graph?graph=3d&round=3"}>
          <Card className="bg-gray-300 p-4 hover:bg-red-200 transition-colors flex items-center justify-between font-semibold">
            <Boxes />
            See Attestation Visualiser
          </Card>
        </Link>
      </div>
      <div className="bg-gray-200 row-span-2 col-span-2 p-4 flex justify-center items-center">
        <BadgeholdersChart />
      </div>
      <div className="bg-gray-200 row-span-2 col-span-2 p-4 flex justify-center items-center">
        Chart - 3
      </div>
    </div>
  );
};

export default Home;
