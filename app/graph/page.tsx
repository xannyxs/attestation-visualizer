"use server";

import ThreeGraph from "@/components/ThreeGraphWrapper";
import TwoGraph from "@/components/TwoGraphWrapper";
import RoundDropdown from "@/components/misc/RoundDropdown";
import GraphSwitch from "@/components/misc/GraphSwitch";
import attestationFetch from "@/lib/actions/attestationFetch";
import buildAddressHashMap from "@/lib/utils/buildAddressHashmap";
import SideBar from "@/components/Sidebar/Sidebar";

const Graph = async ({
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
    console.log("Missing roundParam or graphParam");
    return null;
  }

  const graphData = await attestationFetch(roundParam);
  const addresses = await buildAddressHashMap(graphData);

  return (
    <>
      <div className="flex"></div>
      <RoundDropdown selectedRound={roundParam} selectedGraph={graphParam} />
      <GraphSwitch selectedRound={roundParam} selectedGraph={graphParam} />
      <div className="absolute">
        {graphParam === "3d" ? (
          <ThreeGraph graphData={graphData} addresses={addresses} />
        ) : (
          <TwoGraph graphData={graphData} addresses={addresses} />
        )}
      </div>
    </>
  );
};

export default Graph;
