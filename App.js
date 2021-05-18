import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";
import SecretIdForm from "./src/components/SecretIdForm";
import MainScreen from "./src/screens/MainScreen";
import styles from "./src/styles/styles";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          alignItems: "center",
          paddingTop: "15%",
        }}
      >
        <Text style={styles.h1}>The Gambia Health Wallet</Text>
        <MainScreen></MainScreen>
      </View>
    </PaperProvider>
  );
}
