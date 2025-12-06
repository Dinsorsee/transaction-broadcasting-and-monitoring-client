import { ApiResult } from "../api/ApiResult";
import TransactionInput from "../models/TransactionInput";

export default class Service {
  private defaultOptions: RequestInit = {
    headers: { "Content-Type": "application/json" },
  };

  constructor() {
    this.debug("Client initialized");
  }

  get = async <T>(transaction_hash: string): Promise<ApiResult<T>> => {
    if (!transaction_hash) {
      return { data: null, error: "Incorrect transaction hash" };
    }
    const options: RequestInit = {
      ...this.defaultOptions,
      method: "GET",
    };
    return this.handleRequest<T>(() =>
      fetch(
        `https://mock-node-wgqbnxruha-as.a.run.app/check/${transaction_hash}`,
        options
      )
    );
  };

  post = async <T>(
    url: string,
    body: TransactionInput
  ): Promise<ApiResult<T>> => {
    if (!url) {
      return { data: null, error: "Missing URL" };
    }
    const options: RequestInit = {
      ...this.defaultOptions,
      method: "POST",
      body: JSON.stringify(body),
    };
    return this.handleRequest<T>(() => fetch(url, options));
  };

  private handleRequest = async <T>(
    request: () => Promise<Response>
  ): Promise<ApiResult<T>> => {
    const res = await request();

    if (!res.ok) {
      const errorText = await res.text();
      return { data: null, error: errorText };
    }

    const json = await res.json();
    return { data: json as T, error: null };
  };

  private debug = (message: string) => {
    console.log(`[DEBUG] ${message}`);
  };
}
