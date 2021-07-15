import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet,Text} from 'react-native';
import {Title, List, Divider, ActivityIndicator, Colors} from 'react-native-paper';
import SourcePartsList from '../components/SourcePartsList';
import base from '../styles/base';
import { useSelector, useDispatch } from 'react-redux';
import createDispatchObject from '../src/createDispatchObject';
import { getParts } from '../Services/ScrapingApi';
import { useIsFocused } from "@react-navigation/native";

interface IAvailablePartsProps {}

const AvailableParts: React.FunctionComponent<IAvailablePartsProps> = ({navigation}) => {
  const appState = useSelector(state => state.appState);
  const productsState = useSelector(state => state.productsState);
  const vehicleState = useSelector(state => state.vehicleState);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const blackText = { color: '#000000' };

  const retrieveParts = async () => {
    try {
      const requestBody = {
        'year':  vehicleState.year,
        'make':  vehicleState.make,
        'model':  vehicleState.model,
        'modelType':  vehicleState.modelType,
        'engineType': vehicleState.engineType,
        'zipcode':  vehicleState.zipcode,
        'partName': appState.partName.toLowerCase()
      };

      const response = await getParts(requestBody);

      if (response && response.data && response.data.sources) {
        console.log(JSON.stringify(response.data));
        dispatch(createDispatchObject('PULL_PRODUCTS', response.data.sources));
        dispatch(createDispatchObject('SELECT_PART_NAME', appState.partName.toLowerCase()));
      } else {
        console.log('error message');
      }
      setIsLoading(false);
    } catch (error) {
      dispatch(createDispatchObject('PULL_PRODUCTS', []));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(createDispatchObject('CHANGE_PAGE', 'Available Parts'));

  }, []);
  useEffect(() => {
    /*alert(appState.partName.toLowerCase() + ' | ' +productsState.partName.toLowerCase());*/
     /*&& appState.partName.toLowerCase() !== productsState.partName.toLowerCase()*/
    if(isFocused && appState.partName !== '') {
      retrieveParts();
    } else {
      setIsLoading(false);
    }

    /*setPartsSources([
      {
        source: 'ford',
        parts: [
          {
              "name": "Engine Oil",
              "description": "Ford Motorcraft OIL3051",
              "partNumber": "XO5W205Q3SP (5W20)",
              "mfrPART": "XO5W205Q3SP (5W20)",
              "SKU": "",
              "uniqueId": "XO5W205Q3SP (5W20)",
              "price": 29.32,
              "salePrice": 29.32,
              "imgUrl": "https://parts.ford.com/images/photo-images/761/341761.jpg",
              "productUrl": "https://parts.ford.com/shop/en/us/fluids-chemicals-and-lubricants/motor-oils/oil-engine-7870401-1"
          },
          {
              "name": "Engine Oil",
              "description": "Ford Motorcraft OIL3051",
              "partNumber": "XO5W305Q3SP (5W30)",
              "mfrPART": "XO5W305Q3SP (5W30)",
              "SKU": "",
              "uniqueId": "XO5W305Q3SP (5W30)",
              "price": 29.32,
              "salePrice": 29.32,
              "imgUrl": "https://parts.ford.com/images/photo-images/980/368980.jpg",
              "productUrl": "https://parts.ford.com/shop/en/us/fluids-chemicals-and-lubricants/motor-oils/oil-engine-7852581-1"
          }
        ]
      }]);*/
  }, [isFocused]);


  const listOfSourceParts = () => {
    const partsSources = Array.from(productsState.partsSources);

    if (partsSources.length === 0) {
      return <Text style={blackText}>You must select a part from the Maintenance Page.</Text>
    } else {
      return partsSources.map(({source, parts}, index) =>
        <SourcePartsList
          key={index}
          partsList={parts}
          sourceName={source}
        />
      );
    }
  }
  const pageTitle: string = productsState.partsSources.length === 0 ? 'Available Parts' : `Available Parts for ${appState.partName}`;

  return (
    <View style={base.viewFlexCenter}>
      <Title style={base.pageTitle}>{pageTitle}</Title>
      <Divider style={base.dividerTitle} />
      <ActivityIndicator animating={isLoading} color={Colors.red800} size={'large'} />
      {listOfSourceParts()}
    </View>
  );
};

export default AvailableParts;
/*
<List.Item
  title={'Go Back'}
  description=''
  left={(props) => <List.Icon {...props} icon='arrow-left' />}
  style={{width: '100%'}}
  onPress={() => {
    navigation.goBack()
  }}
/>*/
