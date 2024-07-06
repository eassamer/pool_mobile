import CustomHeader from "@/components/CustomHeader";
import { SearchProvider } from "@/components/SearchContext";
import { Stack } from "expo-router/stack";

export default function Layout() {
  const handleSearch = (searchText: string) => {
    console.log("Search:", searchText); // Replace this with your search logic
  };
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
