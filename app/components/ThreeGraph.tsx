"use client";
import * as THREE from "three";
import { useState, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import ShowNodeInfo from "./showNodeInfo";
import ShowNodeCard from "./ShowNodeCard";

function ThreeGraph() {
  const [gData, setGData] = useState<any>({ nodes: [], links: [] });
  const amountOfBadgeHolders = 0.5;

  useEffect(() => {
    const N = 10;
    const data = {
      nodes: [...Array(N).keys()].map((i) => ({ id: i })),
      links: [...Array(N).keys()]
        .filter((id) => id)
        .map((id) => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
        })),
    };

    setGData(data);
  }, []);

  return (
    <>
      <ForceGraph3D
        graphData={gData}
        linkDirectionalArrowLength={2}
        linkDirectionalArrowColor={"green"}
        linkWidth={1}
        nodeResolution={4}
        onNodeClick={ShowNodeCard()}
        onNodeHover={ShowNodeInfo()}
        nodeThreeObject={() =>
          new THREE.Mesh(
            new THREE.BoxGeometry(
              amountOfBadgeHolders * 10,
              amountOfBadgeHolders * 10,
              amountOfBadgeHolders * 10
            )
          )
        }
      />
      ;
    </>
  );
}

export default ThreeGraph;
