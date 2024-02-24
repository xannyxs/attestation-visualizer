import { EthereumAddress } from "../types";

export default async function fetchEnsName(
  address: EthereumAddress,
): Promise<string | null> {
  try {
    const res = await fetch(`/api/fetchensname?address=${address}`);
    if (res.ok) {
      const data = await res.json();

      return data;
    }
    console.log(`Failed to fetch ENS name. Status: ${res.status}`);
    return null;
  } catch (error) {
    console.error("An error occurred while fetching the ENS name:", error);
    return null;
  }
}
