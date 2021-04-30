import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";
import SecretIdForm from "./src/components/SecretIdForm";
import MainScren from "./src/screens/MainScren";
import styles from "./src/styles/styles";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: "15%"
      }}
    >
      <Text style={styles.h1}>The Gambia Vaccination Passport</Text>
      <MainScren></MainScren>
    </View>
  );
}
