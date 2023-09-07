export type EthereumAddress = `0x${string}`;

export interface ICardProps {
  currentAddress: { id: string };
  referredBy: EthereumAddress;
  referredMethod: string;
  retroPGFRound: number;
}
