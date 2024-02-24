import dynamic from "next/dynamic";

const ThreeGraph = dynamic(() => import("./ThreeGraph"), {
  ssr: false,
});

export default ThreeGraph;
