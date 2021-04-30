import React, { useEffect, useState } from "react";
import { Button, View, TextInput } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TextInput } from "react-native-paper";

const SecretIdForm = () => {
  const retrieveData = async () => {
    console.log("retrieving data", secretId);
    console.log("going to axios");
    const res = await axios
      .get(`https://draman.iprocuratio.com/api/patients/${secretId}`)
      .catch((err) => console.error("error", err));
    await AsyncStorage.setItem("secretId", secretId);
    await AsyncStorage.setItem("data", res ? JSON.stringify(res.data) : null);
    setPatientData(res.data);

    console.log("all keys", await AsyncStorage.getAllKeys());
  };

  const [secretId, setSecretId] = useState("");

  return (
    <View>
      <TextInput
        placeholder="Please introduce your Secret ID"
        value={secretId}
        onChangeText={(text) => setSecretId(text)}
      />
      <Button
        disabled={!secretId}
        title="Submit"
        onPress={() => {
          retrieveData();
        }}
      />
    </View>
  );
};

export default SecretIdForm;
