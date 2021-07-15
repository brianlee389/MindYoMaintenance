import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState, Fragment} from 'react';
import {View, Text} from 'react-native';
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
  const blackText = { color: '#000000'};

  const partsList = [
    'Brake Pad',
    'Brake Rotor',
    'Engine Oil',
    'Engine Oil Filter',
    'Air Filter',
    'Cabin Air Filter',
    'Serpentine Belt',
    'Battery',
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
  const partsListComponent = partsList.map((partName, index) => {
    const partIsCurrentlyNeeded = notificationsState.filter((part) => {
      return part.toLowerCase() === partName.toLowerCase();
    }).length > 0;
    const rightIcon = (props) => {
      if (partIsCurrentlyNeeded) {
        return <List.Icon {...props} color={Colors.red500} icon={'exclamation'} />
      }
      return null;
    };
    const backgroundColorStyleObject = (props) => {
      if (partIsCurrentlyNeeded) {
        return {backgroundColor: '#FFD23F'}
      }
      return {};
    };

    return (<Fragment key={index}>
      <List.Item
        title={partName}
        description=''
        left={(props) => <List.Icon {...props} color={Colors.blue500} icon={partMappingToIcons[partName]} />}
        right={(props) => rightIcon(props) }
        style={{...blackText, width: '100%', borderBottom: '1px solid #E0E0E2', ...backgroundColorStyleObject()}}
        titleStyle={blackText}
        descriptionStyle={blackText}
        onPress={() => {
          dispatch(createDispatchObject('SELECT_APP_PART_NAME', partName));
          dispatch(createDispatchObject('CHANGE_PAGE', 'Available Parts'));

          navigation.navigate('AvailableParts');
        }}
        onLongPress={() => console.log('mark as completed')}
      />
    </Fragment>);
  });

  return (
    <View style={{...base.viewFlexCenter}}>
      <Title style={base.pageTitle}>Maintenance Items</Title>
      {partsListComponent}
    </View>
  );
};

export default MaintenanceList;
