import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import {Title, List} from 'react-native-paper';
import base from '../styles/base';

import createDispatchObject from '../src/createDispatchObject';

interface IPartInformationPage {}

const PartInformationPage: React.FunctionComponent<IPartInformationPage> = (props) => {
  /*dispatch(createDispatchObject('CHANGE_PAGE', 'Part Information'));*/
  return (
    <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
      <Title>Parts</Title>
    </View>
  );
};

export default PartInformationPage;
