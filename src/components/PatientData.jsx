import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import common from "../styles/styles";
import { Button, Card, Portal, Dialog, Text } from "react-native-paper";

const PatientData = ({ patient }) => {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const removeAllInformation = () => {
    console.log("removing all information");
    
    setConfirmDeleteVisible(false);
  };

  return (
    <Card>
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
        <View style={common.centered}>
          <Button
            icon="delete"
            mode="contained"
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
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  element: {
    marginLeft: 20,
  },
});

export default PatientData;
