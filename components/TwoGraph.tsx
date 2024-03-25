"use client";

import {
  type ICardProps as CardType,
  type Attestation,
  type EthereumAddress,
  type IGraph,
} from "@/lib/types";
import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { ForceGraph2D } from "react-force-graph";
import makeBlockie from "ethereum-blockies-base64";
import buildGraphData from "@/lib/utils/buildGraph";
import { useSelectedNodeContext } from "./context/SelectedNodeContextProps";

const initImages = async (
  addressHashMap: Map<string, CardType>,
): Promise<Map<string, HTMLImageElement>> => {
  const acc = new Map<string, HTMLImageElement>();

  const loadImage = (key: string, data?: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        acc.set(key, image);
        resolve();
      };
      image.onerror = reject;

      if (!data) {
        image.src = makeBlockie(key);
      } else {
        image.src = data;
      }
    });
  };

  const loadPromises = [];
  Array.from(addressHashMap.entries()).forEach(([key, value]) => {
    const data = value.imageUrl ?? "";
    loadPromises.push(loadImage(key, data));
  });

  if (!acc.has("0x0000000000000000000000000000000000000000")) {
    loadPromises.push(
      loadImage("0x0000000000000000000000000000000000000000", "sunny.png"),
    );
  }

  await Promise.all(loadPromises);

  return acc;
};

const TwoGraph = ({
  graphData,
  addresses,
}: {
  graphData: Attestation[];
  addresses: Map<EthereumAddress, CardType>;
}) => {
  const fgRef = useRef<any>();
  const { selectedNodeId } = useSelectedNodeContext();

  const [clickedNode, setClickedNode] = useState(null);
  const [graph, setGraph] = useState<IGraph>({ nodes: [], links: [] });
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
  const [imageCache, setImageCache] = useState(
    new Map<string, HTMLImageElement>(),
  );

  const handleNodeClick = (node: any) => {
    setClickedNode(node);
    handleNodeHover(node, false);

    fgRef.current.centerAt(node.x, node.y, 1000);
    fgRef.current.zoom(8, 2000);
  };

  useEffect(() => {
    if (selectedNodeId) {
      const node = graph.nodes.find((node) => node.id === selectedNodeId);
      if (node) {
        handleNodeClick(node);
      }
    }
  }, [selectedNodeId, graph.nodes]);

  useMemo(async () => {
    const buildedGraph = buildGraphData(graphData);
    const newSpriteCache = await initImages(addresses);

    setImageCache(newSpriteCache);
    setGraph(buildedGraph);
  }, [graphData, addresses]);

  const handleNodeHover = (node: any, hover: boolean) => {
    if ((hover && clickedNode && clickedNode === node) || !node) return;

    highlightNodes.clear();
    highlightLinks.clear();

    const highlightReferralChain = (currentNode: any) => {
      if (!currentNode) return;

      highlightNodes.add(currentNode);

      const additionalInfo = addresses.get(currentNode.id);
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
    <Suspense fallback={<div className="text-3xl text-white">Loading...</div>}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graph}
        nodeAutoColorBy="type"
        linkAutoColorBy="type"
        linkWidth={(link) => (highlightLinks.has(link) ? 1.0 : 0.2)}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={(link) =>
          highlightLinks.has(link) ? 10 : 0.06
        }
        linkColor={(link) => (highlightLinks.has(link) ? "red" : "lightblue")}
        onNodeClick={(node) => {
          const selectedNode = addresses.get(node.id as EthereumAddress);
          if (selectedNode) {
            handleNodeClick(node);
            // openModal(<ShowNodeCard cardInfo={selectedNode} />);
          }
        }}
        nodeCanvasObject={(node, ctx) => {
          const size = 6;
          const image = imageCache.get(node.id);

          if (image) {
            ctx.drawImage(
              image,
              node.x! - size / 2,
              node.y! - size / 2,
              size,
              size,
            );
          } else {
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, size / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = "lightblue";
            ctx.fill();
          }
        }}
        onNodeHover={(node) => handleNodeHover(node, true)}
      />
    </Suspense>
  );
};

export default TwoGraph;
