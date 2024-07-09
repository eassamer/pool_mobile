import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SearchContext } from "./SearchContext";
import { CurrentInfo } from "./info/CurrentInfo";
import { TodayInfo } from "./info/TodayInfo";
import { WeeklyInfo } from "./info/WeeklyInfo";

export const CustomComponent = ({ title }: { title: string }) => {
  const { searchValue, coordination, citySelected } = useContext(SearchContext);
  const [temp, setTemp] = useState<any>({});
  useEffect(() => {
    const fetchTempCity = async (latitude: string, longitude: string) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_hours=24&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=7&hourly=temperature_2m,wind_speed_10m`
        );
        const temp = await response.json();
        setTemp(temp);
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
  const denied = ["ERR1", "ERR2", "ERR3"];

  return (
    <View style={styles.container}>
      {denied.includes(searchValue) && (
        <Text style={styles.errorStyle}>
          {searchValue === "ERR1" &&
            "GeoLocation is not enabled, please enable it in your app settings"}
          {searchValue === "ERR2" &&
            "Could not find result for the supplied address or coordinates"}
          {searchValue === "ERR3" &&
            "The service connection is lost please check your internet connection or try again later"}
        </Text>
      )}
      {!denied.includes(searchValue) && title === "Currently" ? (
        <CurrentInfo citySelected={citySelected} temp={temp} />
      ) : !denied.includes(searchValue) && title === "Today" ? (
        <TodayInfo citySelected={citySelected} temp={temp} />
      ) : !denied.includes(searchValue) && title === "Weekly" ? (
        <WeeklyInfo citySelected={citySelected} temp={temp} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 1,
    width: "100%",
    height: "100%",
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
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
