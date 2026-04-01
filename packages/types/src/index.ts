export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface HealthStatus {
  status: "ok";
  service: string;
  timestamp: string;
}

export interface HelloResponse {
  message: string;
}
