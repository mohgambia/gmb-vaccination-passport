import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import PatientData from "../components/PatientData";
import SecretIdForm from "../components/SecretIdForm";

const MainScren = ({ navigation }) => {
  const [patientData, setPatientData] = useState({});

  const removeAllPatientData = () => {
    AsyncStorage.removeItem("data");
    setPatientData({});
  };

  useEffect(() => {
    try {
      AsyncStorage.getItem("data").then((res) => {
        setPatientData(JSON.parse(res) || {});
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <View>
      {!patientData._id ? (
        <SecretIdForm setPatientData={setPatientData} />
      ) : (
        <PatientData
          patient={patientData}
          removeAllPatientData={removeAllPatientData}
          navigation={navigation}
          setPatientData={setPatientData}
        ></PatientData>
      )}
    </View>
  );
};

export default MainScren;
