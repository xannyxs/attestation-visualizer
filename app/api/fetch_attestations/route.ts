import { NextResponse, NextRequest } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Attestation } from "@/lib/types";
import {
  c_CLIENT_URI,
  c_QUERY,
  c_GQL_VARIABLES,
  c_ATTESTER,
} from "@/app.config";

const createApolloClient = () =>
  new ApolloClient({
    uri: c_CLIENT_URI,
    cache: new InMemoryCache(),
  });

const fetchAttestations = async (
  client: ApolloClient<any>,
  round: string,
): Promise<Attestation[]> => {
  const { data } = await client.query({
    query: gql`
      ${c_QUERY}
    `,
    variables: {
      ...c_GQL_VARIABLES,
    },
  });

  return data.attestations
    .map((attestation: any) => ({
      ...attestation,
      decodedDataJson: JSON.parse(attestation.decodedDataJson),
    }))
    .filter(
      (attestation: Attestation) =>
        attestation.decodedDataJson[0]!.value.value === round.toString(),
    )
    .filter((attestation: Attestation) =>
      c_ATTESTER.includes(attestation.attester),
    );
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  const round = request.nextUrl.searchParams.get("round");
  if (!round) {
    return new NextResponse("No round param in URL", { status: 404 });
  }

  const client = createApolloClient();

  try {
    const attestations = await fetchAttestations(client, round);
    return new NextResponse(JSON.stringify(attestations));
  } catch (error) {
    console.error("Error fetching attestations:", error);
    return new NextResponse("An error occurred while processing your request", {
      status: 500,
    });
  }
}
