export type EthereumAddress = `0x${string}`;

export interface ICardProps {
  currentAddress: EthereumAddress;
  referredBy: EthereumAddress;
  referredMethod: string;
  retroPGFRound: number | null;
  imageUrl?: string;
}
