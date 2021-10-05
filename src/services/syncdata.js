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
  console.log("retrieve data", patientId, date, name, lastName);

  let link = !patientId
    ? `https://covid19.crvs.gm/api/patients/checkPatient?firstName=${name.toUpperCase()}&lastName=${lastName.toUpperCase()}&birthDate=${date}`
    : `https://covid19.crvs.gm/api/patients/${patientId}`;

  const res = await axios.get(link).catch((err) => {
    console.error(err, 'errrrrrr*****');
    setError("There was an error: " + err);
  });
  console.log("retrieved data", res.data);

  
  await AsyncStorage.setItem("secretId", patientId);
  await AsyncStorage.setItem("data", res ? JSON.stringify(res.data) : null);
  callback && callback(res.data);

  console.log("all keys", await AsyncStorage.getAllKeys());
};
