import * as React from "react";
import { View, Text, TextInput, Button } from "react-native";
import SecretIdForm from "./src/components/SecretIdForm";
import MainScreen from "./src/screens/MainScreen";
import styles from "./src/styles/styles";
import { Provider as PaperProvider } from "react-native-paper";
import AppBar from "./src/components/AppBar";

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
       
        <AppBar></AppBar>
        <MainScreen></MainScreen>
      </View>
    </PaperProvider>
  );
}
