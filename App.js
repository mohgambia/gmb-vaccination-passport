import * as React from "react";
import "react-native-gesture-handler";

import { View, StyleSheet, Text } from "react-native";
import MainScreen from "./src/screens/MainScreen";
// import styles from "./src/styles/styles";
import { Provider as PaperProvider } from "react-native-paper";
import AppBar from "./src/components/AppBar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QRCodes from "./src/screens/QRCodes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={MainScreen}   options={{ title: 'The Gambia Health Wallet', animationEnabled: true }}></Stack.Screen>
          <Stack.Screen name="QRCodes" component={QRCodes}   options={{ title: 'QRCodes', animationEnabled: true }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

