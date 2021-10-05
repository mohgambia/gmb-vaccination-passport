import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const retrieveData = async (
  patientId,
  callback,
  setError,
  date,
  name,
  lastName
) => {

  let link = !patientId
    ? `https://covid19.crvs.gm/api/patients/checkPatient?firstName=${name}&lastName=${lastName}&birthDate=${date}`
    : `https://covid19.crvs.gm/api/patients/${patientId}`;

  const res = await axios.get(link).catch((err) => {
    console.error(err, 'errrrrrr*****');
    setError("There was an error: " + err);
  });
  if (!res.data) {
    setError("Patient not found")
  }
  
  await AsyncStorage.setItem("secretId", patientId);
  await AsyncStorage.setItem("data", res ? JSON.stringify(res.data) : null);
  callback && callback(res.data);
};
