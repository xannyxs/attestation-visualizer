import { useEnsName } from "wagmi";
import { EthereumAddress } from "../types";

export default function (address: EthereumAddress) {
  const ensName = useEnsName(address as EthereumAddress);
}
