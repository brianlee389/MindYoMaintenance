import React, {useEffect, useState} from 'react';
import {ScrollView, View, Image, StyleSheet,Text} from 'react-native';
import {Title, List, Divider, ActivityIndicator, Colors, Button} from 'react-native-paper';
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
  const [clickedShowResults, setClickedShowResults] = useState(-1);
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
        dispatch(createDispatchObject('PULL_PRODUCTS', response.data.sources));
        dispatch(createDispatchObject('SELECT_PART_NAME', appState.partName.toLowerCase()));
      } else {
        dispatch(createDispatchObject('PULL_PRODUCTS', []));
      }
      setIsLoading(false);
    } catch (error) {
      dispatch(createDispatchObject('PULL_PRODUCTS', []));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(createDispatchObject('CHANGE_PAGE', 'Available Parts'));
    }
    if(isFocused && (appState.partName !== '')) {
      setIsLoading(true);
      retrieveParts();
    } else {
      setIsLoading(false);
    }
  }, [isFocused, clickedShowResults]);

  const listOfSourceParts = () => {
    const partsSources = Array.from(productsState.partsSources);

    if (partsSources.length === 0) {
      return (<React.Fragment>
        <Text style={{...blackText, marginTop:10, marginBottom: 10}}>There were no results from the search attempt.</Text>
        <Text style={{...blackText, marginTop:10, marginBottom: 20}}>Click this button to see the results:</Text>
        <Button mode='contained' onPress={()=> {setClickedShowResults(-1*clickedShowResults)}}>Show Results</Button>
      </React.Fragment>);
    } else {
      return partsSources.map(({source, parts}, index) =>
        <SourcePartsList
          key={index}
          partsList={parts}
          sourceName={source}
        />
      );
    }
  };
  const pageTitle: string = productsState.partsSources.length === 0 ? 'Search Results' : `Search Results for ${appState.partName}`;

  return (
    <ScrollView contentContainerStyle={base.viewFlexCenter}>
      <Title style={blackText}>{pageTitle}</Title>
      {isLoading ? <ActivityIndicator animating={isLoading} color={Colors.blue800} size={'large'} /> : listOfSourceParts()}
    </ScrollView>
  );
};

export default AvailableParts;
