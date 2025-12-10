import { ApiResult } from "../api/ApiResult";

export default class Service {
  private defaultOptions: RequestInit = {
    headers: { "Content-Type": "application/json" },
  };
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.BAND_APP_LINK ?? "undefined";
    this.debug("Client initialized");
  }

  get = async <T>(path: string): Promise<ApiResult<T>> => {
    const options: RequestInit = {
      ...this.defaultOptions,
      method: "GET",
    };
    return this.handleRequest<T>(() =>
      fetch(`${this.baseUrl}/${path}`, options)
    );
  };

  post = async <T>(path: string, body: unknown): Promise<ApiResult<T>> => {
    const options: RequestInit = {
      ...this.defaultOptions,
      method: "POST",
      body: JSON.stringify(body),
    };
    return this.handleRequest<T>(() =>
      fetch(`${this.baseUrl}/${path}`, options)
    );
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
