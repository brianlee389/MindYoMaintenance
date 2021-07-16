import React, { useState } from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, Theme} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider, Appbar, Title} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as StoreProvider, useSelector } from 'react-redux';
import {combineThemes} from './theme';
import MenuIcon from './components/MenuIcon';
import MenuContent from './components/MenuContent';
import Profile from './Screens/Profile';
import VehicleInformation from './Screens/VehicleInformation';
import AvailableParts from './Screens/AvailableParts';
import MaintenanceList from './Screens/MaintenanceList';
import Authenticate from './Screens/Authenticate';
/*import MaintenanceScheduleScreen from './Screens/MaintenanceScheduleScreen';*/
import store from './src/redux/store';
import base from './styles/base';
import { createStackNavigator } from '@react-navigation/stack';
import AppHeaderBar from './components/AppHeaderBar';

export default function App() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = combineThemes(colorScheme);
  const Tab = createMaterialBottomTabNavigator();

  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme as ReactNativePaper.Theme}>
          <AppHeaderBar />
          <NavigationContainer theme={theme as Theme}>
            <Tab.Navigator>
              <Tab.Screen
                name="Authenticate"
                component={Authenticate}
                options={{
                  tabBarLabel: 'Authentication',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="key-outline" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Vehicle"
                component={VehicleInformation}
                options={{
                  tabBarLabel: 'Your Vehicle',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="car" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="MaintenanceList"
                component={MaintenanceList}
                options={{
                  tabBarLabel: 'Maintenance',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="medical-bag" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="AvailableParts"
                component={AvailableParts}
                options={{
                  tabBarLabel: 'Parts List',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="tools" color={color} size={26} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
}
