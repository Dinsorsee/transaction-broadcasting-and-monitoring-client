import { ApiResult } from "../api/ApiResult";
import TransactionInput from "../models/TransactionInput";

class Client {
  private defaultOptions: RequestInit = {
    headers: { "Content-Type": "application/json" },
  };

  constructor() {
    this.debug("Client initialized");
  }

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
    return { data: await (res.json() as Promise<T>), error: null };
  };

  private debug = (message: string) => {
    console.log(`[DEBUG] ${message}`);
  };
}

export default Client;
