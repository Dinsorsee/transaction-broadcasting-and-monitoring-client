require("dotenv").config();
import Client from "./services/Client";
import TransactionHash from "./models/TransactionHash";

async function main() {
  const client = new Client();
  const url = process.env.BAND_APP_LINK ?? "undefined";
  const body = {
    symbol: "ETH",
    price: 4500,
    timestamp: Date.now(),
  };
  console.log(body);
  const data = await client.post<TransactionHash>(url, body);
  console.log(data);
}

main();
