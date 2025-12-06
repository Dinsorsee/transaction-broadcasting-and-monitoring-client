require("dotenv").config();
import Client from "./services/Client";
import TransactionHash from "./models/TransactionHash";

async function main() {
  const client = new Client();
  const url = process.env.BAND_APP_LINK ?? "undefined";
  const payload = {
    symbol: "ETH",
    price: 4500,
    timestamp: Date.now(),
  };
  const data = await client.post<TransactionHash>(url, payload);
  if (data.error) {
    console.error("Failed to broadcast transaction : ", data.error);
  } else {
    console.log("Your transaction hash :", data.data?.tx_hash);
  }
}

main();
