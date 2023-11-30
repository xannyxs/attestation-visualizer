"use client";

import { ICardProps as CardType, IGraph } from "../types";
import { useState, useEffect, useContext } from "react";
import * as THREE from "three";
import ForceGraph3D from "react-force-graph-3d";
import ShowNodeCard from "./ShowNodeCard";
import makeBlockie from "ethereum-blockies-base64";
import { useGraphData } from "./context/GraphDataContext";
import buildGraphData from "../utils/buildGraph";
import { ModalContext } from "./context/modalContext";
import { useThreeGraphContext } from "./context/ThreeGraphContext";
import { useSelectedNodeContext } from "./context/SelectedNodeContextProps";

const initSprites = (
  addressHashMap: Map<string, CardType>,
): Map<string, THREE.Sprite> => {
  const acc = Array.from(addressHashMap.entries()).reduce(
    (acc, [key, value]) => {
      let texture: THREE.Texture;
      let data = value.imageUrl ?? "";

      if (data === "") {
        return acc;
      }

      texture = new THREE.TextureLoader().load(data);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(8, 8, 0);

      acc.set(key, sprite);
      return acc;
    },
    new Map<string, THREE.Sprite>(),
  );

  if (!acc.has("0x0000000000000000000000000000000000000000")) {
    const texture = new THREE.TextureLoader().load("sunny.png");
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(8, 8, 0);
    acc.set("0x0000000000000000000000000000000000000000", sprite);
  }

  return acc;
};

export default function ThreeGraph() {
  const { fgRef } = useThreeGraphContext();
  const { selectedNodeId } = useSelectedNodeContext();

  const graphDataContext = useGraphData();
  const { openModal } = useContext(ModalContext);

  const [clickedNode, setClickedNode] = useState(null);
  const [graph, setGraph] = useState<IGraph>({ nodes: [], links: [] });
  const [addressHashMap, setAddressHashMap] = useState<Map<
    string,
    CardType
  > | null>(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [spriteCache, setSetSpriteCache] = useState(
    new Map<string, THREE.Sprite>(),
  );

  const handleNodeClick = (node: any) => {
    setClickedNode(node);
    handleNodeHover(node, false);

    const distance = 120;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    fgRef.current?.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node,
      3000,
    );
  };

  useEffect(() => {
    if (selectedNodeId) {
      const node = graph.nodes.find((node) => node.id === selectedNodeId);
      if (node) {
        handleNodeClick(node);
      }
    }
  }, [selectedNodeId, graph.nodes]);

  useEffect(() => {
    if (graphDataContext) {
      const { graphData, addressHashMap } = graphDataContext;
      if (graphData && addressHashMap) {
        const buildedGraph = buildGraphData(graphData);
        const newSpriteCache = initSprites(addressHashMap);

        setSetSpriteCache(newSpriteCache);
        setGraph(buildedGraph);
        setAddressHashMap(addressHashMap);
      }
    }
  }, [graphDataContext]);

  if (!graphDataContext) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        An error occurred
      </div>
    );
  }

  const handleNodeHover = (node: any, hover: boolean) => {
    if ((hover && clickedNode && clickedNode === node) || !node) return;

    highlightNodes.clear();
    highlightLinks.clear();

    const highlightReferralChain = (currentNode: any) => {
      if (!currentNode) return;

      highlightNodes.add(currentNode);

      const additionalInfo = addressHashMap!.get(currentNode.id);
      let referredBy = additionalInfo?.referredBy;

      if (!referredBy) return;

      if (referredBy === "Optimism Foundation") {
        referredBy = "0x0000000000000000000000000000000000000000";
      }
      const link = graph.links.find(
        (link: any) =>
          (link.source.id === currentNode.id &&
            link.target.id === referredBy) ||
          (link.source.id === referredBy && link.target.id === currentNode.id),
      );

      if (link) {
        highlightLinks.add(link);
      }

      const parentNode = graph.nodes.find((n: any) => n.id === referredBy);
      highlightReferralChain(parentNode);
    };

    highlightReferralChain(node);

    setHighlightNodes(new Set(highlightNodes));
    setHighlightLinks(new Set(highlightLinks));
  };

  return (
    <div>
      <ForceGraph3D
        ref={fgRef}
        graphData={graph}
        nodeAutoColorBy="type"
        linkAutoColorBy="type"
        linkWidth={(link) => (highlightLinks.has(link) ? 1.5 : 0.2)}
        linkOpacity={0.5}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={(link) =>
          highlightLinks.has(link) ? 20 : 0.06
        }
        linkColor={(link) => (highlightLinks.has(link) ? "red" : "lightblue")}
        onNodeClick={(node) => {
          const selectedNode = addressHashMap!.get(node.id);
          if (selectedNode) {
            handleNodeClick(node);
            openModal(<ShowNodeCard cardInfo={selectedNode} />);
          }
        }}
        nodeThreeObject={(node: any) => {
          let sprite = spriteCache.get(node.id);
          if (!sprite) {
            const data = makeBlockie(node.id);
            const texture = new THREE.TextureLoader().load(data);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(8, 8, 0);
            spriteCache.set(node.id, sprite);
          }
          return sprite as unknown as THREE.Object3D;
        }}
        onNodeHover={(node) => handleNodeHover(node, true)}
      />
    </div>
  );
}
