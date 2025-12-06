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
    url: string,
    payload: TransactionInput
  ): Promise<ApiResult<TransactionHash>> => {
    const data = await this.service.post<TransactionHash>(url, payload);
    if (data.error) {
      console.error("Failed to broadcast transaction :", data.error);
    } else {
      console.log("Your transaction hash :", data.data);
    }
    return data;
  };

  transactionStatusMonitoring = async (
    tx_hash: string
  ): Promise<ApiResult<TransactionStatus>> => {
    let DEFAULT_RETRY_REQUEST: number = 10;
    let status = await this.service.get<TransactionStatus>(tx_hash);

    while (
      status.data?.tx_status === Status.PENDING &&
      DEFAULT_RETRY_REQUEST > 0
    ) {
      status = await this.service.get<TransactionStatus>(tx_hash);

      if (status.error) {
        console.error("[Error] :", status.error);
      } else if (status.data?.tx_status != null) {
        this.status(status.data?.tx_status);
      } else {
        this.status("null");
      }
      if (status.data?.tx_status === Status.CONFIRMED) {
        this.status("Transaction has been confirmed");
        break;
      }
      if (status.data?.tx_status === Status.FAILED) {
        this.status("Transaction has been failed, please try again");
        break;
      }
      if (DEFAULT_RETRY_REQUEST == 0) {
        this.status("Time out");
        break;
      }
      await sleep(5000);
      DEFAULT_RETRY_REQUEST--;
    }
    return status;
  };

  private status = (message: string) => {
    console.log(`[STATUS] ${message}`);
  };
}
