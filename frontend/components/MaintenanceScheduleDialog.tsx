import React from 'react';
import {Title, Subheading, Divider,Dialog, Button, Portal,DataTable} from 'react-native-paper';
import {Text, View, ScrollView} from 'react-native';

interface IMaintenanceScheduleDialog {}

const MaintenanceScheduleDialog: React.FunctionComponent<IMaintenanceScheduleDialog> = ({visible, setVisible}) => {

  return (<Portal>
    <Dialog visible={visible} onDismiss={() =>  { setVisible(false) }}>
      <Dialog.ScrollArea>
        <ScrollView contentContainerStyle={{padding: 10, backgroundColor: '#FFFFFF'}}>
          <Title style={{color:'#13293d'}}>Maintenance Schedule</Title>
          <DataTable style={{color:'#13293d'}}>
            <DataTable.Header style={{color:'#13293d'}}>
              <DataTable.Title><Subheading style={{color:'#13293d'}}>Part</Subheading></DataTable.Title>
              <DataTable.Title><Subheading style={{color:'#13293d'}}>Frequency</Subheading></DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Engine Oil</Text></DataTable.Cell>
              <DataTable.Cell><Text style={{color:'#13293d'}}>5000-10000 miles</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Oil Filter</Text></DataTable.Cell>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Same as Engine Oil</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Air Filter</Text></DataTable.Cell>
              <DataTable.Cell><Text style={{color:'#13293d'}}>10,000 miles</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Cabin Air Filter</Text></DataTable.Cell
              ><DataTable.Cell><Text style={{color:'#13293d'}}>10,000 miles</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Serpentine Belt </Text></DataTable.Cell>
              <DataTable.Cell><Text style={{color:'#13293d'}}>60,000 miles</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Coolant</Text></DataTable.Cell>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Once a year</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Brake Pads</Text></DataTable.Cell>
              <DataTable.Cell><Text style={{color:'#13293d'}}>35,000 miles</Text></DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell><Text style={{color:'#13293d'}}>Brake Rotors</Text></DataTable.Cell>
              <DataTable.Cell><Text style={{color:'#13293d'}}>35,000 miles</Text></DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </Dialog.ScrollArea>
    </Dialog>
  </Portal>);
};

export default MaintenanceScheduleDialog;
