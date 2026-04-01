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

/** JWT claims after FusionAuth verification (subset + passthrough) */
export type JwtPayload = Record<string, unknown> & {
  sub?: string;
  email?: string;
  exp?: number;
  iat?: number;
};

/** Stable identity fields derived from JWT for APIs */
export interface AuthUser {
  sub?: string;
  email?: string;
}

export interface ProtectedResponse {
  message: string;
  user: JwtPayload;
}
