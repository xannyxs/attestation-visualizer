import { NextResponse, NextRequest } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Attestation } from "@/app/types";
import { c_CLIENT_URI, c_QUERY, c_SCHEMAID, c_ATTESTER } from "@/CONFIG";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const round = request.nextUrl.searchParams.get("round");
  if (!round) {
    return new NextResponse("No round param in URL", {
      status: 404,
    });
  }

  const client = new ApolloClient({
    uri: c_CLIENT_URI,
    cache: new InMemoryCache(),
  });

  try {
    const { data } = await client.query({
      query: gql`
        ${c_QUERY}
      `,
      variables: {
        where: {
          AND: [
            {
              schemaId: {
                equals: c_SCHEMAID,
              },
            },
            {
              revoked: {
                equals: false,
              },
            },
          ],
        },
      },
    });

    let attestationsByAttester = data.attestations.filter(
      (attestation: any) => attestation.attester === c_ATTESTER,
    );

    const recentAttestations = Object.values(attestationsByAttester).map(
      (attestation: any) => ({
        ...attestation,
        decodedDataJson: JSON.parse(attestation.decodedDataJson),
      }),
    );

    const filteredAttestations = recentAttestations.filter(
      (attestation: Attestation) =>
        attestation.decodedDataJson[0].value.value === round,
    );

    return new NextResponse(JSON.stringify(filteredAttestations));
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}
