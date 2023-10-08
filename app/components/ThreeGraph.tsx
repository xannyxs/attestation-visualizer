"use client";

import { ICardProps as CardType} from "../types";
import { useState, useEffect } from "react";
import * as THREE from "three";
import ForceGraph3D from "react-force-graph-3d";
import ShowNodeCard from "./ShowNodeCard";
import makeBlockie from "ethereum-blockies-base64";
import { useGraphData } from "./GraphDataContext";
import buildGraphData from "../utils/buildGraph";
import buildAddressHashMap from "../utils/buildAddressHashmap";

export default function ThreeGraph() {
  const graphData = useGraphData();
  const [graph, setGraph] = useState<any>({ nodes: [], links: [] });
  const [addressHashMap, setAddressHashMap] = useState<Map<string, CardType>>(
    new Map(),
  );
  const [selectedNode, setSelectedNode] = useState<CardType | null>(null);
  const [isCardVisible, setCardVisible] = useState(false);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [hoverNode, setHoverNode] = useState(null);
  const [spriteCache, setSpriteCache] = useState<Map<string, THREE.Sprite>>(
    new Map(),
  );

  useEffect(() => {
    const fetchData = async () => {
      if (graphData) {
        const buildedGraph = buildGraphData(graphData);
        const newAddresses = await buildAddressHashMap(graphData);
        const newSpriteCache = initSprites(newAddresses);

        setGraph(buildedGraph);
        setAddressHashMap(newAddresses);
        setSpriteCache(newSpriteCache);
      }
    };

    fetchData();
  }, [graphData]);

  const handleNodeHover = (node: any) => {
    highlightNodes.clear();
    highlightLinks.clear();

    const highlightReferralChain = (currentNode: any) => {
      if (!currentNode) return;

      highlightNodes.add(currentNode);

      const additionalInfo = addressHashMap.get(currentNode.id);
      const referredBy = additionalInfo?.referredBy;

      if (!referredBy) return;

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

    setHoverNode(node || null);
  };

  const handleClose = () => {
    setCardVisible(false);
    setSelectedNode(null);
  };

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

  return (
    <div>
      {selectedNode && isCardVisible && (
        <ShowNodeCard cardInfo={selectedNode} onClose={handleClose} />
      )}
      <ForceGraph3D
        graphData={graph}
        nodeAutoColorBy="type"
        linkAutoColorBy="type"
        linkWidth={(link) => (highlightLinks.has(link) ? 1.5 : 0.2)}
        linkOpacity={0.5}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={(link) => (highlightLinks.has(link) ? 20 : 1)}
        linkColor={(link) => (highlightLinks.has(link) ? "red" : "lightblue")}
        linkCurvature={0.25}
        onNodeClick={(node) => {
          const additionalInfo = addressHashMap.get(node.id);
          if (additionalInfo) {
            setSelectedNode(additionalInfo);
          }
          setCardVisible(true);
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
        onNodeHover={handleNodeHover}
      />
    </div>
  );
}
