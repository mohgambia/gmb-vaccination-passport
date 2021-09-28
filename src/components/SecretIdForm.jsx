import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button, Avatar } from "react-native-paper";
import { BarCodeScanner } from "expo-barcode-scanner";
import { retrieveData } from "../services/syncdata";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const SecretIdForm = ({ setPatientData }) => {
  const [secretId, setSecretId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setSecretId(data);
    retrieveData(data, setPatientData);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log("date", date);
  };
  const handleScanBarcode = async () => {
    await (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if (hasPermission) setScanning(true);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  let dateFormat = formatDate(date);
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          backgroundColor: "white"
        }}
      >
        Introduce one of the following items:
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Secret Id"
          value={secretId}
          mode="outlined"
          onChangeText={(text) => setSecretId(text)}
          style={{ marginTop: hp("3%") }}
        />
        <Avatar.Icon
          color="white"
          icon="chevron-down"
          size={30}
          style={{
            position: "relative",
            left: hp("17%"),
            marginTop: wp("2%"),
          }}
        />
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
        <Avatar.Icon
          color="white"
          icon="chevron-down"
          size={30}
          style={{
            position: "relative",
            left: hp("17%"),
            marginTop: hp("2%"),
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                display: "flex",
                textAlign: "center",
                marginTop: hp("3%"),
              }}
            >
              Date of Birth
            </Text>

            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              is24Hour={true}
              display="default"
              dateFormat="day month year"
              timeZoneOffsetInMinutes={60}
              timeZoneOffsetInSeconds={3600}
              onChange={onChange}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                left: wp("30%"),
                width: hp("100%"),
              }}
            />
          </View>

          <TextInput
            placeholder="Name"
            value={name}
            mode="outlined"
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            mode="outlined"
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View
          style={{
            zIndex: "1000",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            position: "fixed",
            top: hp("5%"),
            size: hp("10%"),
          }}
        >
          <Button
            style={styles.button}
            disabled={!secretId && !name && !lastName}
            mode="outlined"
            color="red"
            onPress={() => {
              setScanned(false);
              setSecretId("");
            }}
          >
            Reset
          </Button>
          <Button
            style={styles.button}
            disabled={!secretId && !name && !lastName}
            mode="outlined"
            onPress={() => {
              retrieveData(
                secretId,
                setPatientData,
                dateFormat,
                name,
                lastName
              );
            }}
          >
            Submit
          </Button>
        </View>
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
    height: hp("100%"),
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 15,
    marginTop: hp("5%"),
  },
});

export default SecretIdForm;
