import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import common from "../styles/styles";
import { Button, Card, Portal, Dialog, Text } from "react-native-paper";
import VaccinationCard from "./VaccinationCard";
import { retrieveData } from "../services/syncdata";

const PatientData = ({
  patient,
  removeAllPatientData,
  navigation,
  setPatientData,
}) => {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const removeAllInformation = () => {
    console.log("removing all information");

    setConfirmDeleteVisible(false);
    removeAllPatientData();
  };

  const dateOfBirth = new Date(patient.dateOfBirth)

  return (
    <Card style={styles.patientDataCard}>
      <View style={styles.container}>
        <View style={styles.element}>
          <Text>Name</Text>
          <Text style={common.h3}>
            {patient.firstName} {patient.middleName} {patient.lastName}
          </Text>
        </View>
        <View style={styles.element}>
          <Text>Nationality</Text>
          <Text style={common.h3}>
            {patient.nationality}
          </Text>
        </View>
        <View style={styles.element}>
          <Text>NIN</Text>
          <Text style={common.h3}>{patient.NIN}</Text>
        </View>
        <View style={styles.element}>
          <Text>Vaccine Register Number</Text>
          <Text style={common.h3}>{patient.patientVaccineRegisterNumber}</Text>
        </View>
        <View style={styles.element}>
          <Text>Date of Birth</Text>
          <Text style={common.h3}>{dateOfBirth?.toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.vaccinationContainer}>
        <Text style={common.h2}>Vaccinations:</Text>
        {patient.vaccination.map(
          (i) =>
           (i.date || i.nameOfTheVaccine || i.batchNumber) &&
              <VaccinationCard key={patient.date} patient={i}></VaccinationCard>
            
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="sync"
          mode="outlined"
          compact
          onPress={() => retrieveData(patient._id, setPatientData)}
        >
          Refresh Data
        </Button>
        <Button
          icon="qrcode"
          mode="outlined"
          compact
          onPress={() => navigation.navigate("QRCodes")}
        >
          Show QRCodes
        </Button>
        <Button
          icon="delete"
          mode="outlined"
          compact
          onPress={() => setConfirmDeleteVisible(true)}
        >
          Remove all information
        </Button>

        <Portal>
          <Dialog
            visible={confirmDeleteVisible}
            onDismiss={() => setConfirmDeleteVisible(false)}
          >
            <Dialog.Title>Warning!!!</Dialog.Title>
            <Dialog.Content>
              <Text>
                This action can not be undone. To retrieve the data again you
                will need your secretId again, or the QR code.
              </Text>
              <Text>Are you sure to delete all information?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setConfirmDeleteVisible(false)}>
                Cancel
              </Button>
              <Button onPress={removeAllInformation}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
  },
  patientDataCard: {
    height: "100%",
  },
  element: {
    flex: 1,
    minWidth: "40%",
    marginBottom: 15,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  vaccinationContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    // marginBottom: "20pt"
  },
});

export default PatientData;
