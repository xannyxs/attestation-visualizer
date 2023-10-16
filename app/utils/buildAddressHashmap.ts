import { fetchOptimismNFTImage } from "../components/ProfilePicture";
import { Attestation, EthereumAddress, ICardProps as CardType } from "../types";
import fetchEnsName from "./fetchEnsName";

export default async function buildAddressHashMap(
  attestations: Attestation[],
): Promise<Map<EthereumAddress, CardType>> {
  const hashMap = new Map<EthereumAddress, CardType>();

  const fetchPromises: Promise<
    [EthereumAddress, string, string, number | null]
  >[] = attestations.map(async (attestation) => {
    const retroPGFRound = Number(attestation.decodedDataJson[0].value.value);
    const imageUrl = await fetchOptimismNFTImage(attestation.recipient);
    const ens = await fetchEnsName(attestation.recipient);
    return [
      attestation.recipient,
      imageUrl,
      ens,
      isNaN(retroPGFRound) ? null : retroPGFRound,
    ] as [EthereumAddress, string, string, number | null];
  });

  const fetchedData = await Promise.all(fetchPromises);

  for (const [recipient, imageUrl, ens, retroPGFRound] of fetchedData) {
    const attestation = attestations.find((a) => a.recipient === recipient);
    console.log(ens)

    if (attestation) {
      const info: CardType = {
        currentAddress: recipient,
        referredBy: attestation.decodedDataJson[1].value.value,
        referredMethod: attestation.decodedDataJson[2].value.value,
        retroPGFRound,
        imageUrl,
        ens,
      };
      hashMap.set(recipient, info);
    }
  }

  return hashMap;
}
