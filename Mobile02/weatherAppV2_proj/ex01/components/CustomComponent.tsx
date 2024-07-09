import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchContext } from "./SearchContext";

export const CustomComponent = ({ title }: { title: string }) => {
  const { searchValue, coordination } = useContext(SearchContext);
  const [data, setData] = useState<any>({});
  useEffect(() => {
    const fetchTempCity = async (latitude: string, longitude: string) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (coordination.latitude != 0 && coordination.longitude != 0) {
      fetchTempCity(
        coordination.latitude.toString(),
        coordination.longitude.toString()
      );
    }
  }, [coordination]);
  const denied =
    "GeoLocation is not enabled, please enable it in your app settings";

  return (
    <View style={styles.container}>
      {denied != searchValue && <Text style={styles.textStyle}>{title}</Text>}
      <Text
        style={denied == searchValue ? styles.errorStyle : styles.textStyle}
      >
        {searchValue && searchValue + ","}{" "}
        {data && data.current?.temperature_2m}{" "}
        {data && data.current_units?.temperature_2m}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorStyle: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});
