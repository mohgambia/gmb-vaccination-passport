import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
  secretId: yup.mixed(),
});

const SecretIdForm = ({ setPatientData }) => {
  const [secretId, setSecretId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setSecretId(data);
    retrieveData(data, setPatientData);
  };

  const handleScanBarcode = async () => {
    await (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    if (hasPermission) setScanning(true);
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          secretId: '',
          dayData: '',
          monthData: '',
          yearData: '',
          firstName: '',
          lastName: '',
        }}
        validateOnMount={true}
        onSubmit={(values, asjd, asss) => {
          console.log('VALUES', values);
          console.log('VALUES1', asjd);
          console.log('VALUES2', asss);

          retrieveData(
            values.secretId,
            setPatientData,
            setError,
            `${values.yearData}-${values.monthData.padStart(2, '0')}-${
              values.dayData
            }`,
            values.firstName,
            values.lastName
          );
        }}
        validationSchema={validationSchemaData}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          values,
          errors,
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
                onChangeText={handleChange('secretId')}
                onBlur={handleBlur('secretId')}
                value={values.secretId}
                mode="outlined"
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
                    />

                    <TextInput
                      onChangeText={handleChange('monthData')}
                      onBlur={handleBlur('monthData')}
                      value={values.monthData}
                      placeholder="Month"
                      mode="outlined"
                    />
                    <TextInput
                      onChangeText={handleChange('yearData')}
                      onBlur={handleBlur('yearData')}
                      value={values.yearData}
                      placeholder="Year"
                      mode="outlined"
                    />
                  </View>
                  {Object.values(errors) && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'red',
                        fontWeight: 'bold',
                        marginTop: 5,
                      }}
                    >
                      {Object.values(errors)}
                    </Text>
                  )}
                </View>

                <TextInput
                  placeholder="Name"
                  mode="outlined"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
                <TextInput
                  placeholder="Last Name"
                  mode="outlined"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
              </View>
              {(Object.keys(values).length !== 5 ||
                Object.keys(values).length !== 6) && (
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    fontWeight: 'bold',
                    marginTop: 5,
                  }}
                >
                  the data does not exist
                </Text>
              )}
              <View
                style={{
                  zIndex: 1000,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  top: hp(' 1%'),
                  size: hp('10%'),
                }}
              >
                <Button
                  type="reset"
                  style={styles.button}
                  // disabled={
                  //   !secretId &&
                  //   !name &&
                  //   !lastName &&
                  //   !dayData &&
                  //   !monthData &&
                  //   !yearData
                  // }
                  mode="outlined"
                  color="red"
                  onPress={handleReset}
                >
                  Reset
                </Button>
                <Button
                  style={styles.button}
                  // disabled={
                  //   !secretId &&
                  //   !name &&
                  //   !lastName &&
                  //   !dayData &&
                  //   !monthData &&
                  //   !yearData
                  // }
                  mode="outlined"
                  type="submit"
                  onPress={handleSubmit}
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
                <Button onPress={() => setScanning(false)}>
                  Stop Scanning
                </Button>
              </View>
            )}
          </View>
        )}
      </Formik>
    </ScrollView>
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
