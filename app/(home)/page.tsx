"use server";

import attestationFetch from "@/lib/actions/attestationFetch";
import { redirect } from "next/navigation";
// import buildAddressHashMap from "@/lib/utils/buildAddressHashmap";
import BadgeholdersChart from "./components/charts/BadgeholdersChart";
import TokenChart from "./components/charts/TokenChart";
import InformativeGrid from "./components/InformativeGrid";

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

  const attestations = await attestationFetch();
  // const addresses = await buildAddressHashMap(attestations);

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-4 p-4 h-screen bg-white">
      <div className="flex flex-col col-span-1 row-span-4 justify-between p-4 bg-gray-200">
        <InformativeGrid />
      </div>
      <div className="flex col-span-2 row-span-2 justify-center items-center p-4 bg-gray-200">
        <BadgeholdersChart attestations={attestations} />
      </div>
      <div className="flex col-span-2 row-span-2 justify-center items-center p-4 bg-gray-200">
        <TokenChart />
      </div>
    </div>
  );
};

export default Home;
