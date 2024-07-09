import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const getWeatherDescription = (temp: number): string => {
  if (temp >= 30) {
    return "Sunny";
  } else if (temp >= 12 && temp < 30) {
    return "Cloudy";
  } else if (temp >= 10 && temp < 12) {
    return "Rainy";
  } else {
    return "Cold";
  }
};
export const TodayInfo = ({
  citySelected,
  temp,
}: {
  citySelected: any;
  temp: {
    hourly: {
      time: string[];
      temperature_2m: number[];
      relative_humidity_2m: number[];
      wind_speed_10m: number[];
    };
    current: {
      temperature_2m: number;
      wind_speed_10m: number;
    };
    current_units: {
      temperature_2m: string;
      wind_speed_10m: string;
    };
    hourly_units: {
      time: string;
      temperature_2m: string;
      relative_humidity_2m: string;
      wind_speed_10m: string;
    };
  };
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textStyle}>
        {citySelected.name != "" &&
          citySelected.name + ", " + citySelected.admin1}
      </Text>
      <Text style={styles.textStyle}>
        {citySelected.country != "" && citySelected.country}
      </Text>
      {temp.hourly?.time.map((time: string, index: number) => (
        <View key={index} style={styles.element}>
          <Text style={styles.textStyle}>{time.slice(11, 16)}</Text>
          <Text style={styles.textStyle}>
            {temp.hourly.temperature_2m[index] +
              temp.hourly_units.temperature_2m}
          </Text>
          <Text style={styles.textStyle}>
            {temp.hourly.wind_speed_10m[index] +
              temp.hourly_units.wind_speed_10m}
          </Text>
          <Text style={styles.textStyle}>
            {getWeatherDescription(temp.hourly.temperature_2m[index])}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    padding: 10,
  },
  element: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignSelf: "center",
  },
});
