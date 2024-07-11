import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Fontisto } from "@expo/vector-icons";
const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

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
export const TodayInfo = ({
  title,
  citySelected,
  temp,
}: {
  title?: string;
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
  const cleanedTime = temp.hourly?.time.map((time) => time.slice(11, 13) + "h");
  const data = {
    labels: cleanedTime?.filter((_, index) => index % 2 === 0) || [],
    datasets: [
      {
        data:
          temp.hourly?.temperature_2m.filter(
            (_: any, index: number) => index % 2 === 0
          ) || [],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Today Temperature"], // optional
  };
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
      {title === "Today" && citySelected.name != "" && (
        <LineChart
          style={{
            alignSelf: "center",
            marginBottom: 30,
            borderRadius: 10,
          }}
          data={data}
          width={screenWidth - 20}
          height={250}
          chartConfig={chartConfig}
        />
      )}
      {citySelected.name != "" && (
        <ScrollView style={styles.horizontalContainer} horizontal={true}>
          {temp.hourly?.temperature_2m.map((tmp, index) => (
            <View key={index} style={styles.tempCase}>
              <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                {cleanedTime?.[index]}
              </Text>
              <Fontisto
                name={getWeatherIcon(tmp || 0) as any}
                size={28}
                color="#e69d29"
                style={{ alignSelf: "center", marginBottom: 10 }}
              />
              <Text>{tmp + temp.current_units?.temperature_2m}</Text>
              <Text>
                {temp.hourly.wind_speed_10m[index] +
                  temp.current_units?.wind_speed_10m}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  tempCase: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  container: {
    width: "100%",
    flexDirection: "column",
    padding: 10,
  },
  headerStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#370278",
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
  element: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
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
