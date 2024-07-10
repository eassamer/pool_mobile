import { tempInterface } from "@/utils/Temp";
import { View, StyleSheet, Text } from "react-native";

export const CurrentInfo = ({
  citySelected,
  temp,
}: {
  citySelected: any;
  temp: tempInterface;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        {citySelected.name != "" &&
          citySelected.name + ", " + citySelected.admin1}
      </Text>
      <Text style={styles.textStyle}>
        {citySelected.country != "" && citySelected.country}
      </Text>
      <Text style={styles.textStyle}>
        {temp.current?.temperature_2m && temp.current.temperature_2m}{" "}
        {temp.current_units?.temperature_2m &&
          temp.current_units.temperature_2m}
      </Text>
      <Text style={styles.textStyle}>
        {temp.current?.wind_speed_10m && temp.current.wind_speed_10m}{" "}
        {temp.current_units?.wind_speed_10m &&
          temp.current_units.wind_speed_10m}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
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
    color: "white",
  },
});
