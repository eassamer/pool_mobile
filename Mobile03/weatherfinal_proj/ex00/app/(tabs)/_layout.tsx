import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Currently",
          tabBarActiveTintColor: "#370278",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="time-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarActiveTintColor: "#370278",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="calendar-today"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="weekly"
        options={{
          title: "Weekly",
          tabBarActiveTintColor: "#32a852",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="calendar-week"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
