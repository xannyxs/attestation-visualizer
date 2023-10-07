export type EthereumAddress = `0x${string}`;

export interface ICardProps {
  currentAddress: EthereumAddress;
  referredBy: EthereumAddress;
  referredMethod: EthereumAddress;
  retroPGFRound: number | null;
  imageUrl?: string;
}

export interface DecodedDataJsonItemValue {
  name: string;
  type: string;
  value: EthereumAddress;
}

export interface DecodedDataJsonItem {
  name: string;
  signature: string;
  type: string;
  value: DecodedDataJsonItemValue;
}

export interface Attestation {
  __typename: "Attestation";
  attester: EthereumAddress;
  recipient: EthereumAddress;
  decodedDataJson: DecodedDataJsonItem[];
}
