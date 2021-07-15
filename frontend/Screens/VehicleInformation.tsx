import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Title, Text, Avatar, RadioButton, Button, Divider, Subheading} from 'react-native-paper';
import base from '../styles/base';
import { Link } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {combineDarkTheme} from '../theme';
import createDispatchObject from '../src/createDispatchObject';
import { getEngineTypes, getAvailableModelTypes } from '../Services/VehicleTypeApi';
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
  const dispatch = useDispatch();
  const blackText = {color: '#000000'};
  const isFocused = useIsFocused();
  const [modelTypes, setModelTypes] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);

  const [selectedModelTypeIndex, setSelectedModelTypeIndex] = useState(-1);
  const [selectedEngineTypeIndex, setSelectedEngineTypeIndex] = useState(-1);

  useEffect(() => {
    if (isFocused) {
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
    return <Text style={blackText} key={index}>
      <RadioButton
        value={model}
        status={index === selectedModelTypeIndex ? 'checked' : 'unchecked' }
        onPress={() => {
          setSelectedModelTypeIndex(index);
          /*dispatch(createDispatchObject());*/
        }}
        color={'#468189'}
        uncheckedColor={'#13293d'}
        theme={combineDarkTheme()}
      />
      {model}
    </Text>
  });

  const engineRadioButtons = engineTypes.map(({engine, engineId}, index) => {
    return <Text style={blackText} key={index}>
      <RadioButton
        value={engine}
        status={index === selectedEngineTypeIndex ? 'checked' : 'unchecked' }
        onPress={() => {
          setSelectedEngineTypeIndex(index);
          /*dispatch(createDispatchObject());*/
        }}
        color={'#468189'}
        uncheckedColor={'#13293d'}
        theme={combineDarkTheme()}
      />
      {engine}
    </Text>
  });

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
    <View style={{justifyContent: 'flex-start', alignItems: 'center'}}>
      <Title style={base.pageTitle}>Vehicle Information</Title>
      <Divider style={base.dividerTitle} />
        <Avatar.Image
          size={100}
          source={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.EuEmHWYMdp2F5w3Rwq4QxQHaEG%26pid%3DApi&f=1'}
          style={{marginBottom: '12px'}}
        />
      <View style={{justifyContent: 'flex-start', alignItems: 'left'}}>
        <Subheading style={blackText}><b>Year</b></Subheading>
        <Text style={blackText}>{vehicleState.year || ''}</Text>
        <Subheading style={blackText}><b>Make</b></Subheading>
        <Text style={blackText}>{vehicleState.make || ''}</Text>
        <Subheading style={blackText}><b>Model</b></Subheading>
        <Text style={blackText}>{vehicleState.model || ''}</Text>
        <Subheading style={blackText}><b>Submodel(or Model Type):</b></Subheading>
        <Text style={blackText}>{vehicleState.modelType || 'None Selected'}</Text>
        {modelTypeRadioButtons}
        <Subheading style={blackText}><b>Engine</b></Subheading>
        <Text style={blackText}>{vehicleState.engineType || 'None Selected'}</Text>
        {engineRadioButtons}
        <Subheading style={blackText}><b>Odometer</b></Subheading>
        <Text style={blackText}>{vehicleState.miles} miles</Text>
        <Button mode="contained" onPress={() => saveVehicleInformation() }>
          Save
        </Button>
        <Link
          to='/MaintenanceList'>
        View your Maintenance Schedule
        </Link>
      </View>
    </View>

  );
};

export default VehicleInformation;
