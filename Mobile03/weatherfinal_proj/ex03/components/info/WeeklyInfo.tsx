import { tempInterface } from "@/utils/Temp";
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
export const WeeklyInfo = ({
  citySelected,
  temp,
}: {
  citySelected: any;
  temp: tempInterface;
}) => {
  const cleanedTime = temp.daily?.time.map((time: string) => {
    return time.slice(8, 10);
  });
  const data = {
    labels: cleanedTime || [],
    datasets: [
      {
        data: temp.daily?.temperature_2m_max || [],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional
      },
      {
        data: temp.daily?.temperature_2m_min || [],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Msx Temp", "Min Temp"], // optional
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
      {citySelected.name != "" && (
        <LineChart
          style={{
            alignSelf: "center",
            marginBottom: 30,
            backgroundColor: "white",
            borderRadius: 10,
          }}
          data={data}
          width={screenWidth - 20}
          height={250}
          chartConfig={chartConfig}
        />
      )}
      { citySelected.name != "" && (
        <ScrollView style={styles.horizontalContainer} horizontal={true}>
          {temp.daily?.temperature_2m_max.map((tmp, index) => (
            <View key={index} style={styles.tempCase}>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {temp.daily.time[index].slice(5, 10)}
              </Text>
              <Fontisto
                name={getWeatherIcon(tmp || 0) as any}
                size={28}
                color="#e69d29"
                style={{ alignSelf: "center", marginBottom: 10 }}
              />
              <Text style={styles.maxStyle}>
                {tmp + temp.current_units?.temperature_2m}
              </Text>
              <Text style={styles.minStyle}>
                {temp.daily.temperature_2m_min[index] +
                  temp.daily_units.temperature_2m_min}
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
  maxStyle: {
    color: "red",
  },
  minStyle: {
    color: "blue",
  },
});
