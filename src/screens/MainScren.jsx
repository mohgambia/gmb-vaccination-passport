import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import PatientData from "../components/PatientData";
import SecretIdForm from "../components/SecretIdForm";

const MainScren = () => {
  const [patientData, setPatientData] = useState({});

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
        <SecretIdForm setPatientData={setPatientData}/>
      ) : (
        <PatientData patient={patientData}></PatientData>
      )}
    </View>
  );
};

export default MainScren;
