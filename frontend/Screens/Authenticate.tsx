import React, {useState, useEffect} from 'react';
import {View, Text, Linking} from 'react-native';
import {Title, TextInput, Divider, Subheading, Button} from 'react-native-paper';
import base from '../styles/base';
import { useSelector, useDispatch } from 'react-redux';
import createDispatchObject from '../src/createDispatchObject';
import {getFordToken, getRefreshToken} from '../Services/FordAuthApi';
import {getVehicleList, getVehicleInformationApi} from '../Services/FordApi';
import {getZipcodeFromLatLong} from '../Services/ZipcodeApi';

interface IAuthenticateProps {}

const Authenticate: React.FunctionComponent<IAuthenticateProps> = (props) => {
  const blackText = {color: '#000000'};
  const fordAccountLinkUrl = 'https://fordconnect.cv.ford.com/common/login/?make=F&application_id=afdc085b-377a-4351-b23e-5e1d35fb3700&client_id=30990062-9618-40e1-a27b-7c6bcb23658a&response_type=code&state=123&redirect_uri=https%3A%2F%2Flocalhost%3A3000&scope=access';
  const [authCode, setAuthCode] = React.useState('');
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  const vehicleListState = useSelector(state => state.vehicleListState);

  const setVehicleInformation = async () => {
    try {
      const vehicleListResponse = await getVehicleList(authState.access_token);
      const { vehicles } = vehicleListResponse.data;
      dispatch(createDispatchObject('SET_VEHICLE_LIST', vehicles));

      if (vehicles.length > 0) {
        dispatch(createDispatchObject('SET_SELECTED_VEHICLE_ID_INDEX', 0));

        const {
          vehicleId,
          make,
          modelName,
          modelYear,
          color,
          nickName,
          modemEnabled,
          vehicleAuthorizationIndicator,
          serviceCompatible
        } = vehicles[0];

        const vehicleInformationResponse = await getVehicleInformationApi(vehicleId, authState.access_token);
        const {
          vehicle
        } = vehicleInformationResponse.data;
        const {
          vehicleLocation,
          vehicleDetails
        } = vehicle;

        const zipcodeResponse = await getZipcodeFromLatLong(vehicleLocation.latitude, vehicleLocation.longitude);
        if (zipcodeResponse.data.output.length > 0) {
          dispatch(createDispatchObject('SET_VEHICLE_ZIPCODE', zipcodeResponse.data.output[0]));
        } else {
          dispatch(createDispatchObject('SET_VEHICLE_ZIPCODE', '48126'));
        }
        dispatch(createDispatchObject('SET_VEHICLE_DATA', {
          'year': vehicle.modelYear,
          'make': 'Ford',
          'model': vehicle.modelName,
        }));
        dispatch(createDispatchObject('SET_VEHICLE_ID', vehicleId));
        dispatch(createDispatchObject('SET_VEHICLE_ODOMETER', vehicleDetails.odometer));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setAuthState = async () => {
    try {
      if (authState.refresh_token && authState.refresh_token !== '') {
        const refreshTokenResponse = await getRefreshToken(authState.refresh_token);
        const parsedRefreshTokenResponse = JSON.parse(refreshTokenResponse);
        dispatch(createDispatchObject('SET_ACCESS_TOKEN', parsedRefreshTokenResponse.access_token));
        dispatch(createDispatchObject('SET_REFRESH_TOKEN', parsedRefreshTokenResponse.refresh_token));
      } else {
        const tokenResponse = await getFordToken(authState.code);
        dispatch(createDispatchObject('SET_ACCESS_TOKEN', tokenResponse.data.access_token));
        dispatch(createDispatchObject('SET_REFRESH_TOKEN', tokenResponse.data.refresh_token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(createDispatchObject('ADD_NOTIFICATION_TYPE', 'Engine Oil'));
    dispatch(createDispatchObject('CHANGE_PAGE', 'Authentication'));

    const initializeFordDetails = async () => {
      await setAuthState();
    }
    initializeFordDetails();
    /*setVehicleInformation();*/
  }, []);

  useEffect(() => {
    /*alert(JSON.stringify(authState));*/
    if (authState.access_token !== '') {
      setVehicleInformation();
    }
  }, [authState.access_token]);

  return (
    <View style={{...base.viewFlexCenter}}>
      <Title style={base.pageTitle}>Authentication</Title>
      <Divider style={base.dividerTitle} />
      <Subheading style={blackText}>You will need to link your Ford account and then retrieve the code in the results url:</Subheading>
      <Button
          mode="contained"
          onPress={() => Linking.openURL(fordAccountLinkUrl)}
      >Click Here to Open the Linking Url</Button>
      <Subheading style={{...blackText, marginTop: '20px'}}>Authorization Code</Subheading>
      <Divider style={{width: '100%'}} />
      <TextInput
        label='Enter Your Auth Code'
        mode={'outlined'}
        value={authCode}
        onChangeText={text => setAuthCode(text)}
        style={{width: '100%', backgroundColor:'#FFFFFF', marginBottom: '20px'}}
      />
      <Button mode="contained" onPress={() => {
        dispatch(createDispatchObject('SET_CODE', authCode));
      }}>
        Submit
      </Button>
    </View>
  );
};

export default Authenticate;
