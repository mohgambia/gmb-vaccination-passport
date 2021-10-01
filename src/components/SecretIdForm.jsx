import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { retrieveData } from '../services/syncdata';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

let validationSchemaData = yup.object().shape({
  dayData: yup.number().min(1).max(31),
  monthData: yup.number().min(1).max(12),
  yearData: yup.number().min(1900).max(2021),
});

const SecretIdForm = ({ setPatientData }) => {
  const [secretId, setSecretId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dayData, setDay] = useState('');
  const [monthData, setMonth] = useState('');
  const [yearData, setYear] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date());
  console.log('dayData', dayData);
  console.log('monthData', monthData);
  console.log('yearData', yearData);
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setSecretId(data);
    retrieveData(data, setPatientData);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    console.log('date', date);
  };
  const handleScanBarcode = async () => {
    await (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    if (hasPermission) setScanning(true);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  let dateFormat = `${yearData}-${monthData}-${dayData}`;
  //necesito poner aca values.yearData cada uno pero no esta el valor

  return (
    <Formik
      initialValues={{ dayData: '', monthData: '', yearData: '' }}
      validateOnMount={true}
      onSubmit={(values) => console.log(values)}
      validationSchema={validationSchemaData}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              backgroundColor: 'white',
            }}
          >
            Introduce one of the following items:
          </Text>
          <View style={styles.container}>
            <TextInput
              placeholder="Secret Id"
              value={secretId}
              mode="outlined"
              onChangeText={(text) => setSecretId(text)}
              style={{ marginTop: hp('3%') }}
            />
            <Avatar.Icon
              color="white"
              icon="chevron-down"
              size={30}
              style={{
                position: 'relative',
                left: hp('20%'),
                marginTop: wp('2%'),
              }}
            />
            {!scanning && (
              <Button
                style={styles.button}
                icon="qrcode"
                mode="outlined"
                onPress={handleScanBarcode}
              >
                SCAN QR CODE
              </Button>
            )}
            <Avatar.Icon
              color="white"
              icon="chevron-down"
              size={30}
              style={{
                position: 'relative',
                left: hp('20%'),
                marginTop: hp('2%'),
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text
                  style={{
                    display: 'flex',
                    textAlign: 'center',
                    marginTop: hp('3%'),
                  }}
                >
                  Date of Birth
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {console.log('values', values)}
                  <TextInput
                    onChangeText={handleChange('dayData')}
                    onBlur={handleBlur('dayData')}
                    value={values.dayData}
                    placeholder="Day"
                    mode="outlined"
                    // onChangeText={(text) => setDay(text)}
                  />
                  {/* {errors.dayData && touched.dayData && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'red',
                        fontWeight: 'bold',
                        marginTop: 5,
                      }}
                    >
                      {errors.dayData}
                    </Text>
                  )} */}
                  <TextInput
                    onChangeText={handleChange('monthData')}
                    onBlur={handleBlur('monthData')}
                    value={values.monthData}
                    placeholder="Month"
                    mode="outlined"
                    // onChangeText={(text) =>
                    //  setMonth(text)
                    // }
                  />
                  <TextInput
                    onChangeText={handleChange('yearData')}
                    onBlur={handleBlur('yearData')}
                    value={values.yearData}
                    placeholder="Year"
                    mode="outlined"
                    // onChangeText={(text) => setYear(text)}
                  />
                </View>
                {console.log('errors', errors)}
                {errors.dayData && (
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'red',
                      fontWeight: 'bold',
                      marginTop: 5,
                    }}
                  >
                    {errors.dayData}
                  </Text>
                )}
              </View>

              <TextInput
                placeholder="Name"
                value={name}
                mode="outlined"
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                mode="outlined"
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <View
              style={{
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                // position: "fixed",
                top: hp('5%'),
                size: hp('10%'),
              }}
            >
              <Button
                style={styles.button}
                disabled={
                  !secretId &&
                  !name &&
                  !lastName &&
                  !dayData &&
                  !monthData &&
                  !yearData
                }
                mode="outlined"
                color="red"
                onPress={() => {
                  setScanned(false);
                  setSecretId('');
                }}
              >
                Reset
              </Button>
              <Button
                style={styles.button}
                disabled={
                  !secretId &&
                  !name &&
                  !lastName &&
                  !dayData &&
                  !monthData &&
                  !yearData
                }
                mode="outlined"
                type="submit"
                onPress={() => {
                  retrieveData(
                    secretId,
                    setPatientData,
                    dateFormat,
                    name,
                    lastName
                  );
                }}
              >
                Submit
              </Button>
            </View>
          </View>
          {scanning && (
            <View style={styles.qrContainer}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
              <Button onPress={() => setScanning(false)}>Stop Scanning</Button>
            </View>
          )}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: 'white',
    height: hp('100%'),
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 15,
    marginTop: hp('5%'),
  },
});

export default SecretIdForm;
