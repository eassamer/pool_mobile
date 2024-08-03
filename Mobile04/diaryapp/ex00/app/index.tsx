import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import React from "react";
import { router } from "expo-router";

export default function Home() {
  const goToLogin = () => {
    router.push("/login");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/DiaryLogo.svg")}
        style={styles.logo}
      />
      <Text style={styles.title}>WELCOME TO YOUR DIARY APP</Text>
      <Pressable
        style={styles.loginButton}
        onPress={() => {
          goToLogin();
        }}
      >
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FCFAFA",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    padding: 30,
  },
  title: {
    fontFamily: "Gotham-Black",
    fontSize: 40,
    letterSpacing: 1.7,
    textAlign: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  loginButton: {
    marginTop: 80,
    backgroundColor: "#2E282A",
    paddingVertical: 15,
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "Gotham-Black",
    fontSize: 24,
    letterSpacing: 4,
  },
});
