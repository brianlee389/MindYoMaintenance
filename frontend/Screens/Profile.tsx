import React, {useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Title,Divider,Subheading,Dialog, Button, Portal,TextInput} from 'react-native-paper';
import base from '../styles/base';
import { useSelector, useDispatch } from 'react-redux';
import createDispatchObject from '../src/createDispatchObject';
import { Link } from '@react-navigation/native';
import MaintenanceScheduleDialog from '../components/MaintenanceScheduleDialog';
import { useIsFocused } from "@react-navigation/native";

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const appState = useSelector(state => state.appState);
  const productsState = useSelector(state => state.productsState);
  const vehicleState = useSelector(state => state.vehicleState);
  const authState = useSelector(state => state.authState);
  const notificationsState = useSelector(state => state.notificationsState);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const getVehicleAccountName = () => {
    const vehicleAccountName = `${vehicleState.nickname}|${authState.vehicleId}`
    if (!vehicleAccountName) {
      return 'You do not have a synced vehicle.'
    }

    return vehicleAccountName;
  }

  const getMileage = () => {
    if (vehicleState.odometer > vehicleState.dynamicOdometer) {
      return vehicleState.odometer;
    } else {
      return vehicleState.dynamicOdometer;
    }
  }
  const updateVehicleMaintenanceNotifications = () => {
    const difference = vehicleState.dynamicOdometer - vehicleState.odometer;
    if (difference < 10000) {
      dispatch(createDispatchObject('REMOVE_ALL_NOTIFICATIONS'));
    }
    if (difference >= 10000) {
      [
        'Engine Oil',
        'Engine Oil Filter',
        'Air Filter',
        'Cabin Air Filter',
        'Coolant'
      ].forEach((part) => {
        dispatch(createDispatchObject('ADD_NOTIFICATION_TYPE', part));
      });
    }
    if (difference > 35000) {
      [
        'Brake Pad',
        'Brake Rotor'
      ].forEach((part) => {
        dispatch(createDispatchObject('ADD_NOTIFICATION_TYPE', part));
      });
    }
    if (difference > 50000) {
      dispatch(createDispatchObject('ADD_NOTIFICATION_TYPE', 'Serpentine Belt'));
    }
    if (new Date().getFullYear() - Number.parseInt(vehicleState.year) >= 4) {
      dispatch(createDispatchObject('ADD_NOTIFICATION_TYPE', 'Battery'));
    }
  };

  const [visible, setVisible] = React.useState(false);
  const [mileage, setMileage] = React.useState(getMileage());
  const [dynamicOdometer, setDynamicOdometer] = React.useState(0);

  useEffect(() => {
    if (isFocused) {
      dispatch(createDispatchObject('CHANGE_PAGE', 'Profile'));
    }
  }, [isFocused]);
  useEffect(() => {
    updateVehicleMaintenanceNotifications();
  }, [dynamicOdometer]);

  return (
    <ScrollView contentContainerStyle={{...base.viewFlexCenter, padding: 5}} >
      <Subheading style={base.blackText}>Vehicle Account Name</Subheading>
      <Subheading style={base.blackText}>{getVehicleAccountName()}</Subheading>
      <Button mode="contained" style={{width:'100%', marginTop: 20}} onPress={() =>  { setVisible(true) }}>
        View Your Maintenance Schedule
      </Button>
      <MaintenanceScheduleDialog visible={visible} setVisible={setVisible}/>
      <Divider style={{width: '100%', marginBottom: 10}} />

      <Subheading style={base.blackText}>Set Odometer Manually</Subheading>
      <TextInput
        label='Enter Your Mileage(in miles)'
        mode={'outlined'}
        value={mileage}
        onChangeText={text => setMileage(text)}
        outlineColor={'#13293d'}
        style={{width: '100%', backgroundColor:'#FFFFFF', marginBottom: 20, marginTop: 20}}
        theme={{ colors: { text: '#000000' }}}
      />
      <Button mode="contained" style={{width:'100%', marginTop: 20}} onPress={() =>  {
        dispatch(createDispatchObject('SET_VEHICLE_DYNAMIC_ODOMETER', Number.parseFloat(mileage)));
        setDynamicOdometer(Number.parseFloat(mileage));
        alert('Odometer set to ' + mileage + ' miles');
      }}>
        Manually Set Odometer
      </Button>
    </ScrollView>
  );
};

export default Profile;
