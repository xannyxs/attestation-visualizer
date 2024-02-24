import { Attestation } from "../types";

export default function buildGraphData(attestations: Attestation[]) {
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
