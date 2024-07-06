import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SearchContext } from "@/components/SearchContext";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const denied =
    "GeoLocation is not enabled, please enable it in your app settings";
  return (
    <View style={styles.container}>
      {denied != searchValue && <Text style={styles.textStyle}>Currently</Text>}
      <Text
        style={denied == searchValue ? styles.errorStyle : styles.textStyle}
      >
        {searchValue}
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

export default Home;
