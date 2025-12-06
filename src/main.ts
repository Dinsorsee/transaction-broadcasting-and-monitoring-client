require("dotenv").config();
import Client from "./services/Client";
import TransactionHash from "./models/TransactionHash";
import TransactionStatus from "./models/TransactionStatus";
import Status from "./models/Status";
import sleep from "./api/Sleep";

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
    console.error("Failed to broadcast transaction :", data.error);
  } else {
    console.log("Your transaction hash :", data.data?.tx_hash);
  }

  let RETRY_REQUEST_DEFAULT: number = 10;
  if (data.data?.tx_hash != null) {
    let status = await client.get<TransactionStatus>(data.data?.tx_hash);
    while (
      status.data?.tx_status === Status.PENDING &&
      RETRY_REQUEST_DEFAULT > 0
    ) {
      status = await client.get<TransactionStatus>(data.data?.tx_hash);

      if (status.error) {
        console.error("[Error] :", status.error);
      } else {
        console.log("[Transaction Status] :", status.data?.tx_status);
      }

      if (status.data?.tx_status === Status.CONFIRMED) {
        console.log("Transaction has been confirmed");
        break;
      }
      if (status.data?.tx_status === Status.FAILED) {
        console.log("Transaction has been failed, please try again");
        break;
      }
      await sleep(3000);
      console.log("3s passed, monitoring again");
      RETRY_REQUEST_DEFAULT--;
    }
  }
}

main();
