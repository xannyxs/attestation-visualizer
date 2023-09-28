"use client";

import { ICardProps as CardType, EthereumAddress } from "../types";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import SpriteText from "three-spritetext";
import * as THREE from "three";
import { ethers } from "ethers";
import ForceGraph3D from "react-force-graph-3d";
import { abi as EAS } from "@ethereum-attestation-service/eas-contracts/artifacts/contracts/EAS.sol/EAS.json";
import ShowNodeCard from "./ShowNodeCard";

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
  const [graph, setGraph] = useState({ nodes: [], links: [] });
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
        const attestations = data.attestations.map((attestation: any) => {
          return {
            ...attestation,
            decodedDataJson: JSON.parse(attestation.decodedDataJson),
          };
        });

        const addresses: Set<string> = attestations.reduce(
          (acc: Set<string>, attestation: any) => {
            console.log(attestation)
            if (
              attestation.attester ===
              "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9"
            ) {
              return;
            }
            acc.add(attestation.decodedDataJson[1].value.value);
            acc.add(attestation.recipient);
            return acc;
          },
          new Set(),
        );

        setGraph({
          nodes: [
            ...Array.from(addresses).map((address: string) => {
              return {
                id: address,
                name: address,
                type: "address",
              };
            }),
          ] as any,
          links: [
            ...attestations.map((attestation: any) => {
              return {
                source: attestation.decodedDataJson[1].value.value,
                target: attestation.recipient,
                type: attestation.schemaId,
              };
            }),
          ] as any,
        });
        const hashMap: Map<EthereumAddress, CardType> = new Map();

        attestations.forEach((attestation: any) => {
          const retroPGFRound = Number(
            attestation.decodedDataJson[0].value.value,
          );
          const info: CardType = {
            currentAddress: attestation.recipient,
            referredBy: attestation.decodedDataJson[1].value.value,
            referredMethod: attestation.decodedDataJson[2].value.value,
            retroPGFRound: isNaN(retroPGFRound) ? null : retroPGFRound,
          };
          hashMap.set(attestation.recipient, info);
        });

        setAddressHashMap(hashMap);
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
          if (node.type === "address") {
            const icon = blockies?.create({ seed: node.id });
            const data = icon?.toDataURL("image/png");
            const texture = new THREE.TextureLoader().load(data);
            texture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(8, 8, 0);
            return sprite;
          } else {
            const sprite = new SpriteText(node.name);
            sprite.color = node.color;
            sprite.textHeight = 4;
            return sprite;
          }
        }}
      />
    </div>
  );
}
