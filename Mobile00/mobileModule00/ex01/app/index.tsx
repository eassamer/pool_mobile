import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function App() {
  const [showText, setShowText] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.TextContainer}>
        <Text style={styles.text}>{showText ? "Hello World!" : "UBA 06"}</Text>
      </View>
      <Pressable
        style={styles.Button}
        onPress={() => {
          setShowText(!showText);
        }}
      >
        <Text style={styles.textButton}>Click Me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  TextContainer: {
    width: 280,
    height: 80,
    backgroundColor: "#5a22a3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  Button: {
    backgroundColor: "black",
    width: 100,
    height: 40,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
