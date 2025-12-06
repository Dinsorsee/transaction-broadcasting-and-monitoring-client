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

  const data = await client.broadcastTransaction<TransactionHash>(url, payload);
  if (data.data?.tx_hash != null) {
    await client.transactionStatusMonitoring(data.data?.tx_hash);
  }
}

main();
