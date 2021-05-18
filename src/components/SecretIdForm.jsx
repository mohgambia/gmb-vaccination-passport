import React, { useEffect, useState } from "react";
import { Button, View, TextInput, Text, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TextInput } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";

const SecretIdForm = ({ setPatientData }) => {
  const [secretId, setSecretId] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setSecretId(data);
    retrieveData(data);
  };

  const handleScanBarcode = async () => {
    await (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if (hasPermission) setScanning(true);
  };

  const retrieveData = async (patientId) => {
    console.log("retrieving data", patientId);
    console.log(
      "going to axios",
      `https://draman.iprocuratio.com/api/patients/${patientId}`
    );
    const res = await axios
      .get(`https://draman.iprocuratio.com/api/patients/${patientId}`)
      .catch((err) => console.error("error", err));
    console.log("retrieved data", res.data);
    await AsyncStorage.setItem("secretId", patientId);
    await AsyncStorage.setItem("data", res ? JSON.stringify(res.data) : null);
    setPatientData(res.data);

    console.log("all keys", await AsyncStorage.getAllKeys());
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder="Introduce your Secret ID or Scan QR Code"
          value={secretId}
          onChangeText={(text) => setSecretId(text)}
        />
        <Button
          disabled={!secretId}
          title="Submit"
          onPress={() => {
            retrieveData(secretId);
          }}
        />
        {!scanning && (
          <Button title="SCAN QR CODE" onPress={handleScanBarcode} />
        )}
      </View>
      {scanning && (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Button title="Cancel Scan" onPress={() => setScanning(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: 400,
  },
});

export default SecretIdForm;
