import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import common from "../styles/styles";

const QRCodes = () => {
  let base64Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..";

  const [patient, setPatient] = useState({});

  useEffect(() => {
    try {
      AsyncStorage.getItem("data").then((res) => {
        setPatient(JSON.parse(res) || {});
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Patient ID Code (for getting the ID from 3rd party apps)
        </Text>
        <View style={styles.code}>
          {patient._id && (
            <QRCode
              value={patient._id}
              logo={{ uri: base64Logo }}
              size={300}
              logoSize={30}
              logoBackgroundColor="transparent"
            />
          )}
        </View>
        <Text style={styles.subtitle}>
          Validation of the data code (navigate to URL)
        </Text>
        <View style={styles.code}>
          {patient._id && (
            <QRCode
              value={`https://draman.iprocuratio.com/api/patients/${patient._id}`}
              logo={{ uri: base64Logo }}
              size={300}
              logoSize={30}
              logoBackgroundColor="transparent"
            />
          )}
        </View>
        <Text style={styles.subtitle}>
          Vaccination data in vaccination credentials format
        </Text>
        <View style={styles.code}>
          {patient._id && (
            <QRCode
              value={JSON.stringify(patient)}
              logo={{ uri: base64Logo }}
              size={300}
              logoSize={30}
              logoBackgroundColor="transparent"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default QRCodes;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white"
  },
  title: {
    ...common.h1,
  },
  code: {
    marginVertical: 10,
  },
  subtitle: {
    ...common.h3,
    maxWidth: "60%",
    textAlign: "center",
  },
});
