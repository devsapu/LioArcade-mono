import { QueryClient } from "@tanstack/react-query";
import type { HelloResponse } from "@lioarcade/types";

export interface ApiClientOptions {
  baseUrl: string;
}

export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.options.baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`GET ${path} failed with ${response.status}`);
    }
    return (await response.json()) as T;
  }
}

export function createApiClient(baseUrl: string): ApiClient {
  return new ApiClient({ baseUrl });
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
