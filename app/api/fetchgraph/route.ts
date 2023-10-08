import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function GET(): Promise<NextResponse> {
  const client = new ApolloClient({
    uri: "https://optimism.easscan.org/graphql",
    cache: new InMemoryCache(),
  });

  try {
    const { data } = await client.query({
      query: gql`
        query Query($where: AttestationWhereInput) {
          attestations(where: $where) {
            attester
            recipient
            decodedDataJson
          }
        }
      `,
      variables: {
        where: {
          schemaId: {
            equals:
              "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b",
          },
          revoked: { equals: false },
        },
      },
    });

    const filteredAttestations = data.attestations.filter(
      (attestation: any) =>
        attestation.attester === "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9",
    );

    const attestations = filteredAttestations.map((attestation: any) => {
      return {
        ...attestation,
        decodedDataJson: JSON.parse(attestation.decodedDataJson),
      };
    });

    return new NextResponse(JSON.stringify(attestations), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong", {
      status: 500,
    });
  }
}
