import axios from 'axios';
import FormData from 'form-data';

const fordApiInformation = {
  'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
  'api-version': '2020-06-01',
  'Content-Type': 'application/json',
};

export const getVehicleList = async (accessToken) => {
  var config = {
    method: 'get',
    url: 'https://api.mps.ford.com/api/fordconnect/vehicles/v1',
    headers: {
      'Accept': 'application/json',
      'api-version': '2020-06-01',
      'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  return axios(config);
}

// export const unlockFord = async (accessToken) => {
//   const formData = new FormData();
//   const vehicleId = '8a7f9fa878849d8a0179579d2f26043a';
//
//   var config = {
//     method: 'post',
//     url: `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}/unlock`,
//     headers: {
//       'Accept': '*/*',
//       'Content-Type': 'application/json',
//       'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
//       'Authorization': `Bearer ${accessToken}`,
//       'api-version': '2020-06-01',
//       'callback-url': '{{callback-url}}',
//       // ...formData.getHeaders()
//     },
//     data : formData
//   };
//
//   return axios(config);
// }

export const getVehicleInformationApi = async (vehicleId, accessToken) => {
  var config = {
    method: 'get',
    url: `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}`,
    headers: {
      'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
      'Authorization': `Bearer ${accessToken}`,
      'api-version': '2020-06-01'
    }
  };

  return axios(config);
};

export const retrieveCurrentVehicleData = async (accessToken) => {
  try {
    const vehicleListResponse = await getVehicleList(accessToken);
    const { vehicles } = vehicleListResponse.data;

    if (vehicles.length === 0) {
      return {}
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

      const vehicleInformationResponse = await getVehicleInformationApi(vehicleId, accessToken);

      return vehicleInformationResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const turnOnVehicleLocation = async (vehicleId, accessToken) => {
  var config = {
    method: 'post',
    url: `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}/location`,
    headers: {
      'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
      'Authorization': `Bearer ${accessToken}`,
      'api-version': '2020-06-01'
    }
  };

  // {
  //   "status": "SUCCESS",
  //   "commandStatus": "COMPLETED",
  //   "commandId": "8e2b8daa-b8fe-4734-9a58-8fb661b0f81b"
  // }
  return axios(config)
}

export const getVehicleLocation = async (vehicleId, accessToken) => {
  const response = await turnOnVehicleLocation(vehicleId, accessToken);

  const config = {
    method: 'get',
    url: `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}/location`,
    headers: {
      'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
      'Authorization': `Bearer ${accessToken}`,
      'api-version': '2020-06-01'
    }
  };
//   {
//     "status": "SUCCESS",
//     "vehicleLocation": {
//         "longitude": "-83.205099",
//         "latitude": "42.300192",
//         "speed": 0.0,
//         "direction": "NORTHWEST",
//         "timeStamp": "07-15-2021 02:49:16"
//     }
// }
  return axios(config);
}


export const getVehicleImageThumbnailBlobUrl = async (vehicleId, year, make, model, accessToken) => {
  // return new Promise((resolve, reject) => {
  const headers = {
    'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
    'Authorization': `Bearer ${accessToken}`,
    'api-version': '2020-06-01'
  };
  //   RNFetchBlob.fetch(
  //     'GET',
  //     `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}/images/thumbnail?make=${make}&model=${model}&year=${year}`,
  //     headers
  //   )
  //   .then((response) => {
  //     // let base64Str = response.base64()
  //     const base64Str = response.data;
  //     const mimetype_attachment = 'image/png';
  //     var imageBase64 = 'data:'+mimetype_attachment+';base64,'+base64Str;
  //     // Return base64 image
  //     resolve(imageBase64);
  //   }).catch((error) => {
  //     reject(error);
  //   });
  // });
  const mimetype_attachment = 'image/png';
  const imageResponse = await axios
    .get(`https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId.toString()}/images/thumbnail?make=${make}&model=${model}&year=${year.toString()}`,
      {
        headers: headers,
        responseType: 'arraybuffer'
      });
    // .then(response => Buffer.from(response.data, 'binary').toString('base64'));
  const base64Str = require('buffer').Buffer.from(imageResponse.data, 'binary').toString('base64');

  const imageString = 'data:'+mimetype_attachment+';base64,'+base64Str;
  return imageString;
}
