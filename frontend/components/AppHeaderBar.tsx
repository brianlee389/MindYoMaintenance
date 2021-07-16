import React from 'react';
import {Appbar} from 'react-native-paper';
import { useSelector } from 'react-redux';
interface IAppHeaderBar {}

const AppHeaderBar: React.FunctionComponent<IAppHeaderBar> = ({pageName, navigation, previous}) => {
  const appState = useSelector(state => state.appState);

  return (<Appbar.Header style={{}}>
    {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    <Appbar.Content titleStyle={{textAlign: 'center'}} title={appState.page} subtitle={''} />
  </Appbar.Header>);
};

export default AppHeaderBar;
