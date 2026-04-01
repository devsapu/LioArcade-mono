import type { HelloResponse } from "@lioarcade/types";

export function getHelloMessage(): HelloResponse {
  return {
    message: "Hello from BFF"
  };
}
