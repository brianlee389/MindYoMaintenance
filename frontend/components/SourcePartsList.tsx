import React from 'react';
import {View, Image, StyleSheet, Text, Linking} from 'react-native';
import {Title, List, Divider, Avatar} from 'react-native-paper';
import base from '../styles/base';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
  logo: {
    width: 66,
    height: 58,
  },
  fullWidth: {
    width: '100%'
  }
});
const emptyImage = 'https://shop.advanceautoparts.com/wcsstore/CVB2BDirectStorefrontAssetStore/responsive/images/noImage_108x108.png';

interface ISourcePartsListProps {}

const SourcePartsList: React.FunctionComponent<ISourcePartsListProps> = ({partsList, sourceName}) => {
  const listHeaderItem = (<List.Item
      style={{justifyContent: 'flex-start', alignItems: 'center' }}
      title={sourceName}
      titleStyle={{...base.blackText, textAlign:'center', color: '#13293d'}}
  />);
  const getProductsComponent = () => {
    if (!partsList || partsList.length === 0) {
      return (<List.Item
        style={{width: '100%', ...base.blackText}}
        titleStyle={{color: '#13293d'}}
        descriptionStyle={{color: '#13293d'}}
        title={`There were no parts available from ${sourceName}`}
        description={'Try entering a specific model or engine.'}
      />);
    }

    return partsList.map(({name, description, price, imgUrl, productUrl}, index) => {
      const getThumbnailImage = () => {
        if (!imgUrl) {
          return require('../assets/missingimage.png');
        }
        return {uri: (imgUrl || emptyImage)};
      }
      return (<List.Item
        style={styles.fullWidth}
        key={index}
        title={name}
        titleStyle={{color: '#13293d'}}
        description={description + '\nPrice $' + price}
        descriptionStyle={{color: '#13293d'}}
        onPress={() => { Linking.openURL(productUrl) }}
        left={props => {
          return <Avatar.Image
            size={60}
            /*style={{...styles.tinyLogo}}*/
            source={getThumbnailImage()}
          />;
        }}
      />);
    });
  };

  return (
    <React.Fragment>
      <Divider style={styles.fullWidth} />
      {listHeaderItem}
      <Divider style={styles.fullWidth} />
      {getProductsComponent()}
      <Divider style={styles.fullWidth} />
    </React.Fragment>
  );
};

export default SourcePartsList;
