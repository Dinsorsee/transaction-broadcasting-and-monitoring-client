import Service from "./Service";
import TransactionInput from "../models/TransactionInput";
import { ApiResult } from "../api/ApiResult";
import Status from "../models/Status";
import sleep from "../api/Sleep";
import TransactionStatus from "../models/TransactionStatus";

export default class Client {
  private service: Service;

  constructor() {
    this.service = new Service();
  }

  broadcastTransaction = async <TransactionHash>(
    payload: TransactionInput
  ): Promise<ApiResult<TransactionHash>> => {
    const data = await this.service.post<TransactionHash>("broadcast", payload);
    if (data.error) {
      console.error("[Error] :", data.error);
    } else {
      console.log("[Your transaction hash] :", data.data);
    }
    return data;
  };

  transactionStatusMonitoring = async (
    tx_hash: string
  ): Promise<ApiResult<TransactionStatus>> => {
    let attempts: number = 0;
    const maxRetries: number = 20;
    let status = await this.service.get<TransactionStatus>(`check/${tx_hash}`);

    console.log("🖥️  Start Monitoring...");
    while (status.data?.tx_status === Status.PENDING && attempts < maxRetries) {
      this.logStatus(status);

      await sleep(5000);

      status = await this.service.get<TransactionStatus>(`check/${tx_hash}`);
      attempts++;
    }
    this.logStatus(status);
    return status;
  };

  private logStatus = (result: ApiResult<TransactionStatus>) => {
    if (result.error) return console.error("[Error]", result.error);
    const status = result.data?.tx_status;

    switch (status) {
      case Status.CONFIRMED:
        return console.log("[STATUS] CONFIRMED.");
      case Status.FAILED:
        return console.log("[STATUS] FAILED.");
      case Status.PENDING:
        return console.log("[STATUS] Pending…");
      case undefined:
        return console.log("[STATUS] UNDEFINED.");
      default:
        return console.log(`[STATUS] UNKNOWN: ${status}`);
    }
  };
}
