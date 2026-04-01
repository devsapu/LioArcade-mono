import { createApiClient, createQueryClient } from "@lioarcade/api-client";
import type { HealthStatus } from "@lioarcade/types";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const queryClient = createQueryClient();
const apiClient = createApiClient("http://localhost:4000");

function HomeScreen() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => apiClient.get<HealthStatus>("/health")
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LioArcade Mobile</Text>
      <Text>Ready for API integration.</Text>
      <Text selectable>{health.isLoading ? "Loading..." : JSON.stringify(health.data)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "700"
  }
});
