import { tempInterface } from "@/utils/Temp";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Fontisto, FontAwesome5 } from "@expo/vector-icons";

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

const getWeatherIcon = (temp: number): string => {
  if (temp >= 30) {
    return "day-sunny";
  } else if (temp >= 12 && temp < 30) {
    return "cloudy";
  } else if (temp >= 10 && temp < 12) {
    return "rain";
  } else {
    return "snow";
  }
};

export const CurrentInfo = ({
  citySelected,
  temp,
}: {
  citySelected: any;
  temp: tempInterface;
}) => {
  return (
    <ScrollView style={styles.container}>
      {citySelected.name != "" && (
        <View style={styles.InfoCont}>
          <Text style={styles.headerStyle}>
            {citySelected.name != "" &&
              citySelected.name + ", " + citySelected.admin1}
          </Text>
          <Text style={styles.textStyle}>
            {citySelected.country != "" && citySelected.country}
          </Text>
        </View>
      )}
      <Text style={styles.tempStyle}>
        {temp.current?.temperature_2m && temp.current.temperature_2m}{" "}
        {temp.current_units?.temperature_2m &&
          temp.current_units.temperature_2m}
      </Text>
      {citySelected.name != "" && (
        <Text style={styles.descriptionStyle}>
          {getWeatherDescription(temp.current?.temperature_2m || 0)}
        </Text>
      )}
      {citySelected.name != "" && (
        <Fontisto
          name={getWeatherIcon(temp.current?.temperature_2m || 0) as any}
          size={70}
          color="#e69d29"
          style={{ alignSelf: "center", marginBottom: 10 }}
        />
      )}
      {citySelected.name != "" && (
        <Text style={styles.windStyle}>
          <FontAwesome5 name="wind" size={20} color="white" />
          {"  "}
          {temp.current?.wind_speed_10m && temp.current.wind_speed_10m}{" "}
          {temp.current_units?.wind_speed_10m &&
            temp.current_units.wind_speed_10m}
        </Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    flex: 1,
  },
  InfoCont: {
    marginTop: 100,
    width: "100%",
    height: 100,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
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
  headerStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#370278",
  },
  tempStyle: {
    fontSize: 32,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    color: "#e69d29",
    marginBottom: 35,
  },
  descriptionStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    marginBottom: 35,
  },
  windStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    alignSelf: "center",
  },
});
