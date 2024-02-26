"use server";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Attestation } from "@/lib/types";
import { c_CLIENT_URI, c_QUERY, c_GQL_VARIABLES, c_ATTESTER } from "@/CONFIG";

const createApolloClient = () =>
  new ApolloClient({
    uri: c_CLIENT_URI,
    cache: new InMemoryCache(),
  });

const fetchAttestations = async (
  client: ApolloClient<any>,
  round: number,
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
    .filter((attestation: Attestation) => attestation.attester === c_ATTESTER)
    .map((attestation: any) => ({
      ...attestation,
      decodedDataJson: JSON.parse(attestation.decodedDataJson),
    }))
    .filter(
      (attestation: Attestation) =>
        attestation.decodedDataJson[0]!.value.value === round.toString(),
    );
};

const attestationFetch = async (round: number) => {
  const client = createApolloClient();

  const attestations = await fetchAttestations(client, round);
  return attestations;
};

export default attestationFetch;
