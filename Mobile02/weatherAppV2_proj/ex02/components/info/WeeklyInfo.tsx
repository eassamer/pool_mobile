import { tempInterface } from "@/utils/Temp";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const getWeatherDescription = (minTemp: number, maxTemp: number): string => {
  if (maxTemp >= 30) {
    return "Sunny";
  } else if (maxTemp >= 20 && maxTemp < 30) {
    return "Cloudy";
  } else if (maxTemp >= 10 && maxTemp < 20) {
    return "Rainy";
  } else {
    return "Cold";
  }
};

export const WeeklyInfo = ({
  citySelected,
  temp,
}: {
  citySelected: any;
  temp: tempInterface;
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
      {temp.daily?.time.map((time: string, index: number) => (
        <View key={index} style={styles.element}>
          <Text style={styles.textStyle}>{time}</Text>
          <Text style={styles.textStyle}>
            {temp.daily.temperature_2m_min[index] +
              temp.daily_units.temperature_2m_min}
          </Text>
          <Text style={styles.textStyle}>
            {temp.daily.temperature_2m_max[index] +
              temp.daily_units.temperature_2m_max}
          </Text>
          <Text style={styles.textStyle}>
            {getWeatherDescription(
              temp.daily.temperature_2m_min[index],
              temp.daily.temperature_2m_max[index]
            )}
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
