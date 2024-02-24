export type EthereumAddress = `0x${string}`;

export interface ICardProps {
  currentAddress: EthereumAddress;
  referredBy: EthereumAddress | string;
  referredMethod: EthereumAddress;
  retroPGFRound: number | null;
  ens: string | null;
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

export interface IGraph {
  nodes: {
    id: string;
    name: string;
    type: string;
    links: any[];
  }[];
  links: {
    source: string;
    target: string;
    type: string;
  }[];
}

export enum ActiveView {
  Grid = "grid",
  List = "list",
  Credits = "credits",
  Bug = "bug",
  Feature = "feature",
  None = "none",
}
