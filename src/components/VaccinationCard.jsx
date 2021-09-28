import React from "react";
import { Surface, Button, Text } from "react-native-paper";
import {StyleSheet, View} from 'react-native'

const VaccinationCard = ({ patient }) => {
  return (
    <Surface style={styles.vaccinationItem}>
      <Button icon="eyedropper" />
      <View>
        <Text style={styles.vaccinationText}>{`Date: ${patient.date ? new Date(
          patient.date
        ).toLocaleDateString(): "not registered"}`}</Text>
        <Text
          style={styles.vaccinationText}
        >{`Vaccine: ${patient.nameOfTheVaccine}`}</Text>
        <Text
          style={styles.vaccinationText}
        >{`Place: ${patient.placeofVaccination?.place}`}</Text>
        <Text
          style={styles.vaccinationText}
        >{`Vaccinator: ${patient.vaccinatorFullName}`}</Text>
        <Text
          style={styles.vaccinationText}
        >{`Batch Number: ${patient.batchNumber}`}</Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  vaccinationItem: {
    marginLeft: 10,
    marginTop: 20,
    padding: 10,
    paddingTop: 10,
    flexDirection: "row",
  },
  vaccinationText: {
    fontSize: 9,
    fontWeight: "600",
  },
});

export default VaccinationCard;
