import TransactionInput from "../models/TransactionInput";

class Client {
  private defaultOptions: RequestInit = {
    headers: { "Content-Type": "application/json" },
  };

  constructor() {
    this.debug("Client initialized");
  }

  post = async <T>(url: string, body: TransactionInput): Promise<T> => {
    if (url === "undefined") {
      throw new Error("undefined env variable");
    }
    const options: RequestInit = {
      ...this.defaultOptions,
      method: "POST",
      body: JSON.stringify(body),
    };
    return await this.handleRequest<T>(() => fetch(url, options));
  };

  handleRequest = async <T>(request: () => Promise<Response>): Promise<T> => {
    const res = await request();
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}`);
    }
    return (await res.json()) as T;
  };

  debug = (message: string) => {
    console.log(`[DEBUG] ${message}`);
  };
}

export default Client;
