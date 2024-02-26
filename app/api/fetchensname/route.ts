import { NextResponse, NextRequest } from "next/server";
import { EthereumAddress } from "@/lib/types";
import { JsonRpcProvider } from "ethers/providers";
import { getAddress } from "viem";

async function fetchEnsName({
  address,
}: {
  address: EthereumAddress;
}): Promise<string | null> {
  const provider = new JsonRpcProvider(process.env["INFURA_URL"]);
  const checksumAddress = getAddress(address);

  try {
    const ensName = await provider.lookupAddress(checksumAddress);

    return ensName || null;
  } catch (error: any) {
    console.error("Error fetching ENS name:", error);
    return null;
  }
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const address = req.nextUrl.searchParams.get("address");

  if (!address) {
    return new NextResponse("Bad Request: Missing ETH Address", {
      status: 400,
    });
  }

  try {
    const ensName = await fetchEnsName({
      address: address as EthereumAddress,
    });

    if (!ensName) {
      return new NextResponse("Could not find the ENS address", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(ensName), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error, { status: 500 });
  }
}
