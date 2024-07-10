import CustomHeader from "@/components/CustomHeader";
import { SearchProvider } from "@/components/SearchContext";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <SearchProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            header: () => <CustomHeader />,
          }}
        />
      </Stack>
    </SearchProvider>
  );
}
