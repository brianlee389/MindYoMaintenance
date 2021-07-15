import React from 'react';
import {Appbar} from 'react-native-paper';

interface IAppHeaderBar {}

const AppHeaderBar: React.FunctionComponent<IAppHeaderBar> = ({pageName, navigation, previous}) => {
  return (<Appbar.Header style={{}}>
    {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    <Appbar.Content title={pageName} subtitle={''} />
  </Appbar.Header>);
};

export default AppHeaderBar;
