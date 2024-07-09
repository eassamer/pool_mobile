import React, { useContext, useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import { SearchContext } from "./SearchContext"; // Adjust the path as necessary
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";

const CustomHeader = () => {
  const { searchValue, setSearchValue, setCoordination, setCitySelected } =
    useContext(SearchContext);
  const [searchText, setSearchText] = useState(searchValue);
  const [cities, setCities] = useState<any>([]);
  useEffect(() => {
    if (searchText.length > 0) {
      fetchCities(searchText);
    } else {
      setCities([]);
    }
  }, [searchText]);

  const fetchCities = async (value: string, isStored: boolean = false) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}`
      );
      const data = await response.json();
      if (isStored) {
        return data.results;
      }
      setCities(data.results || []);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchNameByCord = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      const city: any = await fetchCities(data.address.city, true);
      setCitySelected(city[0]);
      setSearchValue(data.address.city);
      setCoordination({
        latitude: city[0]?.latitude || 0,
        longitude: city[0]?.longitude || 0,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <View style={styles.container}>
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
              setSearchValue("ERROR1");
            } else {
              await Location.requestBackgroundPermissionsAsync();

              let location = await Location.getCurrentPositionAsync({});

              fetchNameByCord(
                location.coords.latitude,
                location.coords.longitude
              );
            }
          }}
          style={styles.locationButton}
        >
          <FontAwesome name="location-arrow" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {cities.length > 0 && (
        <FlatList
          data={cities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              onPress={() => {
                setCoordination({
                  latitude: item.latitude,
                  longitude: item.longitude,
                });
                setSearchValue(`${item.name}`);
                setSearchText(item.name);
                setCitySelected(item);
                setCities([]);
              }}
              style={styles.cityItem}
            >
              <Text>{item.name}</Text>
              <Text style={styles.cityDetail}>{item.admin1}</Text>
              <Text style={styles.cityDetail}>{item.country}</Text>
            </TouchableOpacity>
          )}
          style={styles.cityList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
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
  cityList: {
    maxHeight: 200,
  },
  cityItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cityDetail: {
    color: "#555",
  },
});

export default CustomHeader;
