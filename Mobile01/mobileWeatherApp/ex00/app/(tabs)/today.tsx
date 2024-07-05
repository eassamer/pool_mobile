import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SearchContext } from "@/components/SearchContext";

const Today = () => {
  // const { searchValue } = useContext(SearchContext);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default Today;
