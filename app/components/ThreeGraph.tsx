'use client'
import React, { useEffect, useRef } from "react";
import ForceGraph3D from "3d-force-graph";

function ThreeGraph() {
  const containerRef = useRef(null);

  useEffect(() => {
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };

    const Graph = ForceGraph3D()(containerRef.current).graphData(gData);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}

export default ThreeGraph;
