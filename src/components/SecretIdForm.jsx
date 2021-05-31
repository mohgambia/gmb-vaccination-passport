import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import { retrieveData } from "../services/syncdata";

const SecretIdForm = ({ setPatientData }) => {
  const [secretId, setSecretId] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setSecretId(data);
    retrieveData(data, setPatientData);
  };

  const handleScanBarcode = async () => {
    await (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if (hasPermission) setScanning(true);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Introduce your Secret Id or SCAN QR Code
        </Text>
        <TextInput
          placeholder="Secret Id"
          value={secretId}
          mode="outlined"
          onChangeText={(text) => setSecretId(text)}
        />
        <Button
          style={styles.button}
          disabled={!secretId}
          mode="outlined"
          onPress={() => {
            retrieveData(secretId, setPatientData);
          }}
        >
          Submit
        </Button>
        <Button
          style={styles.button}
          disabled={!secretId}
          mode="outlined"
          color="red"
          onPress={() => {
            setScanned(false);
            setSecretId("");
          }}
        >
          Reset
        </Button>
        {!scanning && (
          <Button
            style={styles.button}
            icon="qrcode"
            mode="outlined"
            onPress={handleScanBarcode}
          >
            SCAN QR CODE
          </Button>
        )}
      </View>
      {scanning && (
        <View style={styles.qrContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Button onPress={() => setScanning(false)}>Stop Scanning</Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 15,
  },
});

export default SecretIdForm;
