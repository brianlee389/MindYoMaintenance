import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image} from 'react-native';
import {Title, Text, Avatar, RadioButton, Button, Divider, Subheading} from 'react-native-paper';
import base from '../styles/base';
import { useSelector, useDispatch } from 'react-redux';
import {combineDarkTheme} from '../theme';
import createDispatchObject from '../src/createDispatchObject';
import { getEngineTypes, getAvailableModelTypes } from '../Services/VehicleTypeApi';
import { getVehicleImageThumbnailBlobUrl } from '../Services/FordApi';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

interface IVehicleInformation {}

const VehicleInformation: React.FunctionComponent<IVehicleInformation> = ({navigation}) => {
  const appState = useSelector(state => state.appState);
  const productsState = useSelector(state => state.productsState);
  const vehicleState = useSelector(state => state.vehicleState);
  const authState = useSelector(state => state.authState);

  const dispatch = useDispatch();
  const blackText = {color: '#000000'};
  const isFocused = useIsFocused();
  const [modelTypes, setModelTypes] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);

  const [selectedModelTypeIndex, setSelectedModelTypeIndex] = useState(-1);
  const [selectedEngineTypeIndex, setSelectedEngineTypeIndex] = useState(-1);
  const [blobUrl, setBlobUrl] = useState('');

  useEffect(() => {
    if (isFocused) {
      const loadBlobUrl = async () => {
        try {
          const loadedBlobUrl = await getVehicleImageThumbnailBlobUrl(authState.vehicleId, vehicleState.year, vehicleState.make, vehicleState.model, authState.access_token);
          setBlobUrl(loadedBlobUrl);
        } catch (error) {
          console.log(error);
          setBlobUrl(require('../assets/missingimage.png'));
        }
      }

      loadBlobUrl();

      dispatch(createDispatchObject('CHANGE_PAGE', 'Vehicle Information'));
      const retrieveModelTypes = async () => {
        try {
          const data = await getAvailableModelTypes(vehicleState.year, vehicleState.make, vehicleState.model);

          if (!data || data.length === 0) {
            setSelectedModelTypeIndex(-1);
            setModelTypes([]);
          } else {
            setModelTypes(data);
            if (vehicleState.selectedModelTypeIndex === -1) {
              setSelectedModelTypeIndex(0);
            } else {
              setSelectedModelTypeIndex(vehicleState.selectedModelTypeIndex);
            }
          }
        } catch (error) {
          setModelTypes([]);
          setSelectedModelTypeIndex(-1);
        }
      };
      retrieveModelTypes();

    }
  }, [isFocused]);

  useEffect(() => {
    const retrieveEngineTypes = async () => {
      try {
        if (modelTypes.length > 0) {
          const data = await getEngineTypes(modelTypes[selectedModelTypeIndex].modelId);

          if (!data || data.engineTypes.length === 0) {
            setEngineTypes([]);
            setSelectedEngineTypeIndex(-1);
          } else {
            setEngineTypes(data.engineTypes);

            if (vehicleState.selectedEngineTypeIndex === -1) {
              setSelectedEngineTypeIndex(0);
            } else {
              setSelectedEngineTypeIndex(vehicleState.selectedEngineTypeIndex);
            }
          }
        }
      } catch (error) {
          setEngineTypes([]);
          setSelectedEngineTypeIndex(-1);
      }
    };
    retrieveEngineTypes();
  }, [selectedModelTypeIndex]);

  const modelTypeRadioButtons = Array.from(modelTypes).map(({model, modelId}, index) => {
    return <RadioButton.Item key={index} label={model} value={index} />;
  });
  const modelTypeRadioGroup = (<RadioButton.Group style={{width: '100%'}} onValueChange={value => setSelectedModelTypeIndex(value)} value={selectedModelTypeIndex}>
      {modelTypeRadioButtons}
    </RadioButton.Group>);

  const engineRadioButtons = engineTypes.map(({engine, engineId}, index) => {
    return <RadioButton.Item key={index} label={engine} value={index} />;
  });
  const engineTypeRadioGroup = (<RadioButton.Group style={{width: '100%'}} onValueChange={value => setSelectedEngineTypeIndex(value)} value={selectedEngineTypeIndex}>
      {engineRadioButtons}
  </RadioButton.Group>);

  const saveVehicleInformation = () => {
    if (selectedModelTypeIndex > -1) {
      dispatch(createDispatchObject('SET_VEHICLE_MODEL_TYPE', modelTypes[selectedModelTypeIndex].model));
      dispatch(createDispatchObject('SET_MODEL_TYPE_RADIOBUTTON_INDEX', selectedModelTypeIndex));
      if (selectedEngineTypeIndex > -1) {
        dispatch(createDispatchObject('SET_VEHICLE_ENGINE', engineTypes[selectedEngineTypeIndex].engine));
        dispatch(createDispatchObject('SET_ENGINE_TYPE_RADIOBUTTON_INDEX', selectedEngineTypeIndex));
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center', padding: 5}}>
        <Avatar.Image
          size={175}
          source={{uri: blobUrl}}
          style={{marginBottom: 12, maxWidth: 175, maxHeight: 175, backgroundColor: 'transparent'}}
        />
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Year</Subheading>
        <Text style={blackText}>{vehicleState.year || ''}</Text>
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Make</Subheading>
        <Text style={blackText}>{vehicleState.make || ''}</Text>
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Model</Subheading>
        <Text style={blackText}>{vehicleState.model || ''}</Text>
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Submodel(or Model Type):</Subheading>
        <Text style={blackText}>{vehicleState.modelType || 'None Selected'}</Text>
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Select a submodel:</Subheading>
        {modelTypeRadioGroup}
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Engine</Subheading>
        <Text style={blackText}>{vehicleState.engineType || 'None Selected'}</Text>
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Select an engine:</Subheading>
        {engineTypeRadioGroup}
        <Subheading style={{...blackText, fontWeight: 'bold'}}>Odometer</Subheading>
        <Text style={blackText}>{vehicleState.odometer} miles</Text>
        <Button mode="contained" style={{width:'100%'}} onPress={() => saveVehicleInformation() }>
          Save
        </Button>

    </ScrollView>

  );
};

export default VehicleInformation;
