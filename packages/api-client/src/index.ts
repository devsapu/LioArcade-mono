import { QueryClient } from "@tanstack/react-query";
import type { HelloResponse } from "@lioarcade/types";

export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => string | null | undefined;
}

export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  async get<T>(path: string): Promise<T> {
    const headers = new Headers();
    const token = this.options.getAccessToken?.();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${this.options.baseUrl}${path}`, { headers });
    if (!response.ok) {
      throw new Error(`GET ${path} failed with ${response.status}`);
    }
    return (await response.json()) as T;
  }
}

export function createApiClient(
  baseUrl: string,
  options?: Pick<ApiClientOptions, "getAccessToken">
): ApiClient {
  return new ApiClient({ baseUrl, ...options });
}

export async function getHello(baseUrl: string): Promise<HelloResponse> {
  const client = createApiClient(baseUrl);
  return client.get<HelloResponse>("/api/hello");
}

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1
      }
    }
  });
}
