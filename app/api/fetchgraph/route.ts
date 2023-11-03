import { NextResponse, NextRequest } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const round = request.nextUrl.searchParams.get("round");
  if (!round) {
    return new NextResponse("No round param in URL", {
      status: 404,
    });
  }

  const client = new ApolloClient({
    uri: "https://optimism.easscan.org/graphql",
    cache: new InMemoryCache(),
  });

  // Default
  let fromDateUnixTimestamp = 1697000000;
  let untilDateUnixTimestamp = Math.floor(Date.now() / 1000);
  if (round === "2") {
    console.log("round 2");
    fromDateUnixTimestamp = 1694304000;
    untilDateUnixTimestamp = 1694736000;
  }

  try {
    const { data } = await client.query({
      query: gql`
        query Query($where: AttestationWhereInput) {
          attestations(where: $where) {
            attester
            recipient
            decodedDataJson
            timeCreated
          }
        }
      `,
      variables: {
        where: {
          AND: [
            {
              schemaId: {
                equals:
                  "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b",
              },
            },
            {
              revoked: {
                equals: false,
              },
            },
            {
              timeCreated: {
                gte: fromDateUnixTimestamp,
                lte: untilDateUnixTimestamp,
              },
            },
          ],
        },
      },
    });

    let attestationsByAttester = data.attestations.filter(
      (attestation: any) =>
        attestation.attester === "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9",
    );

    const recentAttestations = Object.values(attestationsByAttester).map(
      (attestation: any) => ({
        ...attestation,
        decodedDataJson: JSON.parse(attestation.decodedDataJson),
      }),
    );

    return new NextResponse(JSON.stringify(recentAttestations));
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}
