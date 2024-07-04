import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const App = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  const handlePress = (input: string) => {
    if (input === "AC") {
      setExpression("");
      setResult("0");
    } else if (input === "C") {
      setExpression(expression.slice(0, -1));
    } else if (input === "=") {
      try {
        setResult(eval(expression).toString());
      } catch (e) {
        console.log("Invalid Expression", "Please enter a valid expression.");
      }
    } else {
      setExpression(expression + input);
    }
  };

  const renderButton = (input: string) => (
    <TouchableOpacity
      key={input}
      style={styles.button}
      onPress={() => handlePress(input)}
    >
      <Text style={styles.buttonText}>{input}</Text>
    </TouchableOpacity>
  );

  const buttons = [
    "7",
    "8",
    "9",
    "4",
    "/",
    "5",
    "6",
    "1",
    "2",
    "*",
    "3",
    "0",
    "-",
    ".",
    "=",
    "+",
    "AC",
    "C",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calculator</Text>
      </View>
      <View style={styles.display}>
        <TextInput
          style={styles.expression}
          value={expression}
          editable={false}
        />
        <TextInput style={styles.result} value={result} editable={false} />
      </View>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <View style={styles.buttonsGrid}>{buttons.map(renderButton)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#6200EE",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  display: {
    padding: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  expression: {
    fontSize: 24,
    color: "#333",
    width: "100%",
    textAlign: "right",
  },
  result: {
    fontSize: 32,
    color: "#000",
    width: "100%",
    textAlign: "right",
    marginTop: 10,
  },
  buttonContainer: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    width: "100%",
  },
  buttonsGrid: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 3,
    paddingVertical: 16,
    margin: 5,
    borderRadius: 5,
    width: "16%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
