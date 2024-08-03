import { router } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
        <Text onPress={() => {
            router.push("/");
        }} style={styles.title}>LOGIN</Text>
      <View style={styles.LogBox}>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>SING IN WITH GOOGLE</Text>
        </Pressable>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>SING IN WITH GITHUB</Text>
        </Pressable>
      </View>
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
    justifyContent: "flex-start",
    gap: 30,
    padding: 20,
  },
  LogBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    gap: 40,
  },
  title: {
    marginTop: 80,
    color: "#2E282A",
    fontFamily: "Gotham-Black",
    fontSize: 40,
    letterSpacing: 1.7,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#2E282A",
    paddingVertical: 17,
    width: "75%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontFamily: "Gotham-Black",
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 4,
  },
});
