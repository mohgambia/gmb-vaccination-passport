import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Banner, Text } from "react-native-paper";

const AppBar = () => {
  return (
    <Appbar >
      {/* <Appbar.Header><Text>Gambia</Text>  </Appbar.Header> */}
        {/* <Appbar.BackAction onPress={_goBack} /> */}
        <Appbar.Content title="The Gambia Health Passport" subtitle="" />
        {/* <Appbar.Action icon="magnify" />
        <Appbar.Action icon="dots-vertical" /> */}
    
    </Appbar>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  up: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    marginBottom:"10pt"
  },
});
