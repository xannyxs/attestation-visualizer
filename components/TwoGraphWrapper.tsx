import dynamic from "next/dynamic";

const TwoGraph = dynamic(() => import("./TwoGraph"), {
  ssr: false,
});

export default TwoGraph;
