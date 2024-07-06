import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { SearchContext } from "./SearchContext"; // Adjust the path as necessary
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
const CustomHeader = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [searchText, setSearchText] = useState(searchValue);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSearchValue(searchText);
        }}
        style={styles.searchButton}
      >
        <FontAwesome name="search" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity
        onPress={async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          console.log(status);
          if (status !== "granted") {
            setSearchValue(
              "GeoLocation is not enabled, please enable it in your app settings"
            );
          } else {
            await Location.requestBackgroundPermissionsAsync();

            let location = await Location.getCurrentPositionAsync({});

            setSearchValue(
              location.coords.latitude + "," + location.coords.longitude
            );
          }
        }}
        style={styles.locationButton}
      >
        <FontAwesome name="location-arrow" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  searchButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginRight: 10,
  },
  locationButton: {
    marginLeft: 10,
  },
});

export default CustomHeader;
