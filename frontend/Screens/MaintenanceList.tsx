import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState, Fragment} from 'react';
import {ScrollView, Text, Alert} from 'react-native';
import {Divider, FAB, List, Portal, Title, Colors} from 'react-native-paper';
import ActionBar from '../components/ActionBar';
import { useSelector, useDispatch } from 'react-redux';
import createDispatchObject from '../src/createDispatchObject';
import base from '../styles/base';

interface IMaintenanceListProps {}

const MaintenanceList: React.FunctionComponent<IMaintenanceListProps> = (props) => {
  const appState = useSelector(state => state.appState);
  const notificationsState = useSelector(state => state.notificationsState);

  const dispatch = useDispatch();
  const isScreenFocused = useIsFocused();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(createDispatchObject('CHANGE_PAGE', 'Authentication'));
    }
  }, [isFocused]);

  const partsList = [
    'Brake Pad',
    'Brake Rotor',
    'Engine Oil',
    'Engine Oil Filter',
    'Air Filter',
    'Cabin Air Filter',
    'Serpentine Belt',
    'Coolant'
  ];

  const partMappingToIcons = {
    'Engine Oil': 'oil-level',
    'Engine Oil Filter': 'oil-level',
    'Battery': 'car-battery',
    'Cabin Air Filter': 'air-purifier',
    'Air Filter': 'air-filter',
    'Brake Pad': 'circle-multiple-outline',
    'Brake Rotor': 'circle-multiple-outline',
    'Serpentine Belt': 'steering',
    'Coolant': 'car-coolant-level'
  };

  const isPartCurrentlyNeeded = (partname) => {
      return notificationsState.filter((notificationType) => {
      return notificationType.toLowerCase() === partname.toLowerCase();
    }).length > 0;
  };
  const partsListComponent = partsList.map((partName, index) => {
    const isNeeded = isPartCurrentlyNeeded(partName);
    const leftIcon = (props) => {
      if (!isNeeded) {
        return <List.Icon {...props} color={Colors.green500} icon={'check'} />
      }
      return <List.Icon {...props} color={Colors.red500} icon={partMappingToIcons[partName]} />;
    };
    const backgroundColorStyleObject = (props) => {
      if (isNeeded) {
        return {backgroundColor: '#C8E0F4'}
      }
      return {};
    };

    return (<Fragment key={index}>
      <List.Item
        title={partName}
        description=''
        left={(props) => leftIcon(props)}
        style={{...base.blackText, width: '100%', borderBottom: '1px solid #16324F', ...backgroundColorStyleObject()}}
        titleStyle={base.blackText}
        descriptionStyle={base.blackText}
        onPress={() => {
          /*if (confirm('Would you like to view available replacement parts?')) {*/
            dispatch(createDispatchObject('SELECT_APP_PART_NAME', partName));
            dispatch(createDispatchObject('CHANGE_PAGE', 'Available Parts'));

            navigation.navigate('AvailableParts');
          /*}*/
        }}
        onLongPress={() => {
          if (isNeeded ) {
            dispatch(createDispatchObject('REMOVE_NOTIFICATION_TYPE', partName));
          }
        }}
      />
    </Fragment>);
  });

  return (
    <ScrollView contentContainerStyle={{...base.viewFlexCenter}}>
      {partsListComponent}
    </ScrollView>
  );
};

export default MaintenanceList;
