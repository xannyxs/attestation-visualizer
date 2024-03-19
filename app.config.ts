export const c_SCHEMAID =
  "0xfdcfdad2dbe7489e0ce56b260348b7f14e8365a8a325aef9834818c00d46b31b";

export const c_QUERY = `
        query Query($where: AttestationWhereInput) {
          attestations(where: $where) {
            attester
            recipient
            decodedDataJson
            timeCreated
          }
        }
`;

export const c_GQL_VARIABLES = {
  where: {
    AND: [{ schemaId: { equals: c_SCHEMAID } }, { revoked: { equals: false } }],
  },
};

export const c_ATTESTER = "0x621477dBA416E12df7FF0d48E14c4D20DC85D7D9";
export const c_CLIENT_URI = "https://optimism.easscan.org/graphql";
