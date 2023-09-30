import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const address = req.nextUrl.searchParams.get('address');

  if (!address) {
    return new NextResponse("Bad Request: Missing ETH Address", { status: 400 });
  }

  try {
    const response = await axios.get(
      `https://api.opensea.io/v2/chain/optimism/account/${address}/nfts`,
      {
        headers: {
          "X-API-KEY": process.env.OPENSEA_API,
          Accept: "application/json",
        },
      },
    );

    return NextResponse.json(response.data)
  } catch (error) {
    console.error(error);
    return new NextResponse("Bad Request", { status: 400 });
  }
}
