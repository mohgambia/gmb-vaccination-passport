import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveData = async (patientId, callback) => {
  const res = await axios
    .get(`https://draman.iprocuratio.com/api/patients/${patientId}`)
    .catch((err) => {
      console.error(err);
      setError("There was an error: " + err);
    });
  console.log("retrieved data", res.data);
  await AsyncStorage.setItem("secretId", patientId);
  await AsyncStorage.setItem("data", res ? JSON.stringify(res.data) : null);
  callback && callback(res.data);

  console.log("all keys", await AsyncStorage.getAllKeys());
};
