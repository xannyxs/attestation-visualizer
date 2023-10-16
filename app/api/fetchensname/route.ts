import { NextResponse, NextRequest } from "next/server";
import { fetchEnsName } from "wagmi/actions";
import { EthereumAddress } from "@/app/types";

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
      return new NextResponse(JSON.stringify({ ensName: address }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify({ ensName }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
