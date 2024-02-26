import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const address = req.nextUrl.searchParams.get("address");

  if (!process.env["OPENSEA_API"]) {
    return new NextResponse("Internal: Missing ENV variable", {
      status: 500,
    });
  }

  if (!address) {
    return new NextResponse("Bad Request: Missing ETH Address", {
      status: 400,
    });
  }

  return fetch(
    `https://api.opensea.io/v2/chain/optimism/account/${address}/nfts`,
    {
      cache: "force-cache",
      headers: {
        "X-API-KEY": process.env["OPENSEA_API"],
        Accept: "application/json",
      },
    },
  )
    .then(async (response) => {
      if (!response.ok) {
        console.log(`Received status code ${response.status}`);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return NextResponse.json(data);
    })
    .catch((err) => {
      console.error(err);
      return new NextResponse("Bad Request", { status: 400 });
    });
}
