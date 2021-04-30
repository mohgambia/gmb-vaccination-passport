import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import common from "../styles/styles";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import QRCodeScanner from "react-native-qrcode-scanner";

const PatientData = ({ patient }) => {
  return (
    <Card>
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{" "}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <View styles={styles.element}>
          <Text>Name</Text>
          <Text style={common.h3}>
            {patient.firstName} {patient.middleName} {patient.lastName}
          </Text>
        </View>
        <View>
          <Text>Name</Text>
          <Text style={common.h3}>
            {patient.firstName} {patient.middleName} {patient.lastName}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  element: {
    marginLeft: 20,
  },
});

export default PatientData;
