import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Title,Divider} from 'react-native-paper';
import base from '../styles/base';
import { useSelector, useDispatch } from 'react-redux';
import createDispatchObject from '../src/createDispatchObject';

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const appState = useSelector(state => state.appState);
  const productsState = useSelector(state => state.productsState);
  const vehicleState = useSelector(state => state.vehicleState);
  const dispatch = useDispatch();

  useEffect(() => {
    /*dispatch(createDispatchObject('SET_VEHICLE_DATA', {
      'year': '2018',
      'make': 'Ford',
      'model': 'Focus',
    }));
    dispatch(createDispatchObject('SET_VEHICLE_ZIPCODE', '19001'));
    dispatch(createDispatchObject('SET_VEHICLE_MODEL_TYPE', ''));
    dispatch(createDispatchObject('SET_VEHICLE_ENGINE', ''));
    dispatch(createDispatchObject('SET_VEHICLE_ODOMETER', 10000));
    dispatch(createDispatchObject('SET_VEHICLE_IMAGE_URL', ''));
    dispatch(createDispatchObject('CHANGE_PAGE', 'Profile'));
    dispatch(createDispatchObject('ADD_NOTIFICATION_TYPE', 'Engine Oil'));*/
  }, []);

  return (
    <View style={base.viewFlexCenter} >
      <Title style={base.pageTitle}>Profile</Title>
      <Divider style={base.dividerTitle} />
      <Text style={{color:'#000000'}}>Hello FirstName LastName</Text>
    </View>
  );
};

export default Profile;
