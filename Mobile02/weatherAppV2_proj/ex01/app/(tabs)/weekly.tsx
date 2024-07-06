import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SearchContext } from "@/components/SearchContext";

const Weekly = () => {
  const { searchValue } = useContext(SearchContext);

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Weekly</Text>
      <Text style={styles.textStyle}>{searchValue}</Text>
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

export default Weekly;
