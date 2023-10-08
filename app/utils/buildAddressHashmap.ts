import { fetchOptimismNFTImage } from "../components/ProfilePicture";
import { Attestation, EthereumAddress, ICardProps as CardType } from "../types";

export default async function buildAddressHashMap(
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
