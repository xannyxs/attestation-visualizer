// @ts-nocheck
import { EthereumAddress } from "../types";

const sdk = require("api")("@opensea/v2.0#4gioue1qll6w3x3p");

export default async function FetchNFT(address: EthereumAddress) {
  sdk.auth("375906d8273742b69eb5e11a42faa455");

  sdk
    .retrieveNftsByAccount({ chain: "optimism", address: "address" })
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
}
