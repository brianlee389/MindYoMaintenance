import React from 'react';
import {Appbar} from 'react-native-paper';

interface IContextualActionBarProps {
  title: string;
  close: () => void;
}

const ContextualActionBar: React.FunctionComponent<IContextualActionBarProps> = (
  props
) => {
  const {close, title, ...extraProps} = {...props};
  const appBarStyle = {
    width: '100%',
    backgroundColor: '#13293D'
  };
  return (
    <Appbar.Header {...extraProps}
      style={appBarStyle}
    >
      <Appbar.Action icon='close' onPress={close} />
      <Appbar.Content title={title} />
      <Appbar.Action icon='delete' onPress={() => {}} />
      <Appbar.Action icon='content-copy' onPress={() => {}} />
      <Appbar.Action icon='magnify' onPress={() => {}} />
      <Appbar.Action icon='dots-vertical' onPress={() => {}} />
    </Appbar.Header>
  );
};

export default ContextualActionBar;
