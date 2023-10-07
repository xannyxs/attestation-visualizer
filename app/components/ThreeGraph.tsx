"use client";

import { Attestation, ICardProps as CardType, EthereumAddress } from "../types";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SpriteText from "three-spritetext";
import * as THREE from "three";
import { ethers } from "ethers";
import ForceGraph3D from "react-force-graph-3d";
import { abi as EAS } from "@ethereum-attestation-service/eas-contracts/artifacts/contracts/EAS.sol/EAS.json";
import ShowNodeCard from "./ShowNodeCard";
import { fetchOptimismNFTImage } from "./ProfilePicture";

function buildGraphData(attestations: any[]) {
  const addresses = new Set<string>;

  const processedAttestations = attestations.map((attestation: any) => {
    addresses.add(attestation.decodedDataJson[1].value.value);
    addresses.add(attestation.recipient);
    return attestation;
  });

  return {
    nodes: Array.from(addresses).map((address) => ({
      id: address,
      name: address,
      type: "address",
    })),
    links: processedAttestations.map((attestation: any) => ({
      source: attestation.decodedDataJson[1].value.value,
      target: attestation.recipient,
      type: attestation.schemaId,
    })),
  };
}

async function buildAddressHashMap(
  attestations: any[],
): Promise<Map<EthereumAddress, CardType>> {
  const hashMap = new Map<EthereumAddress, CardType>();

  for (const attestation of attestations) {
    const retroPGFRound = Number(attestation.decodedDataJson[0].value.value);
    const info: CardType = {
      currentAddress: attestation.recipient,
      referredBy: attestation.decodedDataJson[1].value.value,
      referredMethod: attestation.decodedDataJson[2].value.value,
      retroPGFRound: isNaN(retroPGFRound) ? null : retroPGFRound,
      imageUrl: await fetchOptimismNFTImage(attestation.recipient),
    };
    hashMap.set(attestation.recipient, info);
  }

  return hashMap;
}

export default function ThreeGraph() {
  const rpc = "https://goerli.optimism.io";
  const provider = new ethers.providers.StaticJsonRpcProvider(rpc);
  const eas = new ethers.Contract(
    "0x1d86C2F5cc7fBEc35FEDbd3293b5004A841EA3F0",
    EAS,
    provider,
  );

  const schema =
    "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b";
  const [graph, setGraph] = useState<any>({ nodes: [], links: [] });
  const [addressHashMap, setAddressHashMap] = useState<Map<string, CardType>>(
    new Map(),
  );
  const [selectedNode, setSelectedNode] = useState<CardType | null>(null);
  const [isCardVisible, setCardVisible] = useState(false);

  const { refetch } = useQuery(
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
        setAddressHashMap(await buildAddressHashMap(attestations));
      },
    },
  );

  useEffect(() => {
    const listener = () => {
      refetch();
    };
    eas.off("Attested", listener);
    eas.on("Attested", listener);
  }, [eas, refetch]);

  let blockies: any;
  if (typeof document !== "undefined") {
    blockies = require("ethereum-blockies");
  }

  const handleClose = () => {
    setCardVisible(false);
    setSelectedNode(null);
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
        linkWidth={0.2}
        linkOpacity={0.5}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={1}
        onNodeClick={(node) => {
          const additionalInfo = addressHashMap.get(node.id);
          if (additionalInfo) {
            setSelectedNode(additionalInfo);
          }
          setCardVisible(true);
        }}
        nodeThreeObject={(node: any) => {
          let sprite: any;

          if (node.type === "address") {
            // Initialize with placeholder image
            const placeholderTexture = new THREE.TextureLoader().load(
              "placeholder.png",
            );
            const placeholderMaterial = new THREE.SpriteMaterial({
              map: placeholderTexture,
            });
            sprite = new THREE.Sprite(placeholderMaterial);
            sprite.scale.set(8, 8, 0);

            // Check if the hashMap contains an image URL for this node.id
            const cardInfo = addressHashMap.get(node.id);
            let data = cardInfo?.imageUrl || "";

            // If no image URL is found, use blockies as a fallback
            if (data === "") {
              const blockieIcon = blockies?.create({ seed: node.id });
              data = blockieIcon?.toDataURL("image/png");
            }

            // Create new texture based on the fetched or fallback data
            const newTexture = new THREE.TextureLoader().load(data);
            newTexture.colorSpace = THREE.SRGBColorSpace;

            sprite.material.map = newTexture;
            sprite.material.needsUpdate = true;

            return sprite;
          }

          // For other node types
          sprite = new SpriteText(node.name);
          sprite.color = node.color;
          sprite.textHeight = 4;

          return sprite;
        }}
      />
    </div>
  );
}
