var axios = require('axios');
var FormData = require('form-data');
var {getAccessToken} = require('./fordAuthApi');

const fordApiInformation = {
  applicationId: 'afdc085b-377a-4351-b23e-5e1d35fb3700',
  apiVersion: '2020-06-01'
};

const getVehicleList = async () => {
  const accessToken = await getAccessToken();

  var config = {
    method: 'get',
    url: 'https://api.mps.ford.com/api/fordconnect/vehicles/v1',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-version': '2020-06-01',
      'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  return axios(config);
}

const unlockFord = async () => {
  var data = new FormData();
  const vehicleId = '8a7f9fa878849d8a0179579d2f26043a';
  const accessToken = await getAccessToken();
  console.log(accessToken);
  var config = {
    method: 'post',
    url: `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}/unlock`,
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
      'Authorization': `Bearer ${accessToken}`,
      'api-version': '2020-06-01',
      'callback-url': '{{callback-url}}',
      ...data.getHeaders()
    },
    data : data
  };

  return axios(config);
}

const getVehicleInformationApi = async (vehicleId) => {
  var config = {
    method: 'get',
    url: `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}`,
    headers: {
      'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
      'Authorization': `Bearer ${getAccessToken()}`,
      'api-version': '2020-06-01'
    }
  };

  return axios(config);
};
const retrieveCurrentVehicleData = async () => {
  const vehicleListResponse = await getVehicleList();
  const { vehicles } = vehicleListResponse.data;

  if (vehicles.length === 0) {
    console.log('You have no vehicles registered.');
  } else {
    const {
      vehicleId,
      make,
      modelName,
      modelYear,
      color,
      nickName,
      modemEnabled,
      vehicleAuthorizationIndicator,
      serviceCompatible
    } = vehicles[0];

    const vehicleInformationResponse = await getVehicleInformationApi(vehicleId);

    console.log(JSON.stringify(vehicleInformationResponse.data));
  }
};

exports.retrieveCurrentVehicleData = retrieveCurrentVehicleData;
