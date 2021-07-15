import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Title, List, Divider} from 'react-native-paper';
import base from '../styles/base';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  fullWidth: {
    width: '100%'
  }
});
const blackText = {color: '#000000'};
const emptyImage = 'https://shop.advanceautoparts.com/wcsstore/CVB2BDirectStorefrontAssetStore/responsive/images/noImage_108x108.png';

interface ISourcePartsListProps {}

const SourcePartsList: React.FunctionComponent<ISourcePartsListProps> = ({partsList, sourceName}) => {
  const listHeaderItem = (<List.Item
      style={{justifyContent: 'flex-start', alignItems: 'center', ...blackText}}
      title={sourceName}
  />);
  const getProductsComponent = () => {
    if (partsList.length === 0) {
      return <List.Item
        style={{width: '100%', ...blackText}}
        title={`There were no parts available from ${sourceName}`}
        description={'Try entering a specific model or engine.'}
      />
    }

    return partsList.map(({name, description, price, imgUrl, productUrl}, index) =>
      <List.Item
        style={styles.fullWidth}
        key={index}
        title={name}
        description={description + '\nPrice $' + price}
        left={props => <Image
        style={{...styles.tinyLogo, ...blackText}}
        source={imgUrl || emptyImage}/>}
      />
    );
  }

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
