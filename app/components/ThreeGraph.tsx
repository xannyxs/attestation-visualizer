"use client";

import { Attestation, ICardProps as CardType, EthereumAddress } from "../types";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import * as THREE from "three";
import { ethers } from "ethers";
import ForceGraph3D from "react-force-graph-3d";
import { abi as EAS } from "@ethereum-attestation-service/eas-contracts/artifacts/contracts/EAS.sol/EAS.json";
import ShowNodeCard from "./ShowNodeCard";
import { fetchOptimismNFTImage } from "./ProfilePicture";

const rpc = "https://goerli.optimism.io";
const provider = new ethers.providers.StaticJsonRpcProvider(rpc);
new ethers.Contract(
  "0x1d86C2F5cc7fBEc35FEDbd3293b5004A841EA3F0",
  EAS,
  provider,
);
const schema =
  "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b";

function buildGraphData(attestations: Attestation[]) {
  const addresses = new Set<string>();
  const addressToLinks = new Map<string, any[]>();

  const processedAttestations = attestations.map((attestation) => {
    const source = attestation.decodedDataJson[1].value.value;
    const target = attestation.recipient;

    addresses.add(source);
    addresses.add(target);

    const link = {
      source,
      target,
      type: "address",
    };

    if (!addressToLinks.has(source)) addressToLinks.set(source, []);
    if (!addressToLinks.has(target)) addressToLinks.set(target, []);

    addressToLinks.get(source)?.push(link);
    addressToLinks.get(target)?.push(link);

    return link;
  });

  return {
    nodes: Array.from(addresses).map((address) => ({
      id: address,
      name: address,
      type: "address",
      links: addressToLinks.get(address) || [],
    })),
    links: processedAttestations,
  };
}

async function buildAddressHashMap(
  attestations: Attestation[],
): Promise<Map<EthereumAddress, CardType>> {
  const hashMap = new Map<EthereumAddress, CardType>();

  const fetchPromises: Promise<[EthereumAddress, string, number | null]>[] =
    attestations.map(async (attestation) => {
      const retroPGFRound = Number(attestation.decodedDataJson[0].value.value);
      const imageUrl = await fetchOptimismNFTImage(attestation.recipient);
      return [
        attestation.recipient,
        imageUrl,
        isNaN(retroPGFRound) ? null : retroPGFRound,
      ] as [EthereumAddress, string, number | null];
    });

  const fetchedData = await Promise.all(fetchPromises);

  for (const [recipient, imageUrl, retroPGFRound] of fetchedData) {
    const attestation = attestations.find((a) => a.recipient === recipient);

    if (attestation) {
      const info: CardType = {
        currentAddress: recipient,
        referredBy: attestation.decodedDataJson[1].value.value,
        referredMethod: attestation.decodedDataJson[2].value.value,
        retroPGFRound,
        imageUrl,
      };
      hashMap.set(recipient, info);
    }
  }

  return hashMap;
}

export default function ThreeGraph() {
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

  useQuery(
    gql`
      query Query($where: AttestationWhereInput) {
        attestations(where: $where) {
          attester
          recipient
          decodedDataJson
        }
      }
    `,
    {
      variables: {
        where: {
          schemaId: { equals: schema },
          revoked: { equals: false },
        },
      },
      onCompleted: async (data) => {
        const filteredAttestations = data.attestations.filter(
          (attestation: any) =>
            attestation.attester ===
            "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9",
        );

        const attestations = filteredAttestations.map((attestation: any) => {
          return {
            ...attestation,
            decodedDataJson: JSON.parse(attestation.decodedDataJson),
          };
        });

        const graph = buildGraphData(attestations);
        setGraph(graph);
        const newAddresses = await buildAddressHashMap(attestations);
        setAddressHashMap(newAddresses);
        const newSpriteCache = initSprites(newAddresses);
        setSpriteCache(newSpriteCache);
      },
    },
  );

  let blockies: any;
  if (typeof document !== "undefined") {
    blockies = require("ethereum-blockies-base64");
  }

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
    return Array.from(addressHashMap.entries()).reduce((acc, [key, value]) => {
      let texture: THREE.Texture;
      let data = value.imageUrl ?? "";

      if (key === "0x0000000000000000000000000000000000000000") {
        data = "path/to/sunny.png";
      } else if (data === "") {
        const blockieIcon = blockies?.create({ seed: key });
        data = blockieIcon?.toDataURL("image/png") ?? "";
      }

      texture = new THREE.TextureLoader().load(data);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(8, 8, 0);

      acc.set(key, sprite);
      return acc;
    }, new Map<string, THREE.Sprite>());
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
        linkWidth={(link) => (highlightLinks.has(link) ? 2 : 0.2)}
        linkOpacity={0.5}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={1}
        linkColor={(link: any) =>
          highlightLinks.has(link) ? "red" : "lightblue"
        }
        linkCurvature={0.25}
        onNodeClick={(node) => {
          const additionalInfo = addressHashMap.get(node.id);
          if (additionalInfo) {
            setSelectedNode(additionalInfo);
          }
          setCardVisible(true);
        }}
        nodeThreeObject={(node: any) => {
          const sprite = spriteCache.get(node.id);
          if (sprite) {
            return sprite;
          }
          const defaultSpriteMaterial = new THREE.SpriteMaterial({
            color: 0xffffff,
          });
          const defaultSprite = new THREE.Sprite(defaultSpriteMaterial);
          defaultSprite.scale.set(8, 8, 0);
          return defaultSprite;
        }}
        onNodeHover={handleNodeHover}
      />
    </div>
  );
}
