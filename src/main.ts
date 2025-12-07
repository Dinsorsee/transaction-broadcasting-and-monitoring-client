require("dotenv").config();
import Client from "./services/Client";
import TransactionHash from "./models/TransactionHash";

async function main() {
  const client = new Client();
  const payload = {
    symbol: "ETH",
    price: 4500,
    timestamp: Date.now(),
  };

  const data = await client.broadcastTransaction<TransactionHash>(payload);
  if (!data.data?.tx_hash) {
    console.error("Broadcast failed: transaction hash not found.");
    return;
  }

  await client.transactionStatusMonitoring(data.data?.tx_hash);
}

main();
