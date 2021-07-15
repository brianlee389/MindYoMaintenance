var axios = require('axios');
var FormData = require('form-data');
// var {getFordToken, getRefreshToken} = require('./fordAuthApi');
// const {getZipcodeFromLatLong} = require('../FordPartsScraper/zipcodeLatLong');
const fordApiInformation = {
  'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
  'api-version': '2020-06-01',
  'Content-Type': 'application/json',
};

const getVehicleList = async (accessToken) => {
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

const unlockFord = async (accessToken) => {
  const formData = new FormData();
  const vehicleId = '8a7f9fa878849d8a0179579d2f26043a';

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
      ...formData.getHeaders()
    },
    data : formData
  };

  return axios(config);
}

const getVehicleInformationApi = async (vehicleId, accessToken) => {
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

const retrieveCurrentVehicleData = async (accessToken) => {
  try {
    const vehicleListResponse = await getVehicleList(accessToken);
    const { vehicles } = vehicleListResponse.data;
    console.log(JSON.stringify(vehicles));
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

      const vehicleInformationResponse = await getVehicleInformationApi(vehicleId, accessToken);

      return vehicleInformationResponse.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const turnOnVehicleLocation = async (vehicleId, accessToken) => {
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

const getVehicleLocation = async (vehicleId, accessToken) => {
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

const getVehicleImageThumbnail = async (vehicleId, year, make, model, accessToken) => {
  const headers = {
    'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
    'Authorization': `Bearer ${accessToken}`,
    'api-version': '2020-06-01'
  };
  return axios
    .get(`https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}/images/thumbnail?make=${make}&model=${model}&year=${year}`,
      {
        headers: headers,
        responseType: 'arraybuffer'
      });

  // return axios(config);
}

const callme = async () => {
  try {
    const response = await getRefreshToken('eyJraWQiOiI2cjIzQ2FTeTF4cFdUUFBxYVRtX01Vc2RKZGo1RWlDTnRtME4yVTAxNTdFIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.oHNbsEkpW9eE0T-oYT1fELsqcizrWraNvap6KdngEV4RRCpTRdztUYaSnSQFNdaTnFzpvrAdD3qC8FXQAda8NbO_ZLqeSIPilMn2uR7UstFRvNzy1Apl5MgrdF19Zk68LwaYHo0mOyRR12eAF0rX9X-YYGxzPT371c6BJ00coamKOuNFivPde5moZz7gAy661Eyc79uNAeAAopm4MLgcGldzlYgdvEqDvAOAIpPGtPHlVSMEVl6jY2JcZqheThM-IP4ADalVQIBN9tdSTQY5RLPoJDjLBiJWAa08x6rqeOZRzr5EhsDVx5Vf7V-AkKNJrXWw0Ajf2wV9y1R9bWVmgQ.jyXdtwICYLZVtY8H.LuLXE4o3Qz7GRz-SUj7Z1bJbdBPj-YoD3Qyazry9n137BZ6hiNPN418z4tEFNDNKog4mYTtKoeKLOTVhsBuPnBX2q-ILU5GsPDiaaZOQxIL8iAGvI7qzJ7jxOHj9CFwsqNVPzGB1jRPX1D1zkxfqN40B0WRXV1bpbiVdlmZsepiw_hayrb4JG-AbaXaOCRvIUslfTl3BXfcBrDqvVZwKy1VL3jLDk-fNBV1u9uZ0JG9iA14TDcmDwZYLxmIv6xnUK-RTZXB2RYKrMiNSzDd_lYAojjlsC8UicyCse1_HPuJbqn-Nyi7nbdNMhBINWhfbfj1BojO7UvbErtwQb6PdqDWCewls0zHN-bK7fwqHxnX9pXMwlq-ZBZRZ32pExeVLNiF61kqBk5MT-FicFXCUcMxNctutnqqvwEZOVDJys11r4sgbclnPY-NGD73s7MV2uzreTiJVMeJt35sQ81uvFZfvKguc7I0EWXLqfEXBY9pBNxfStuCr6XQ7SthZR8AZOaGjrPEu1_OHys1GV9WrvqlRUY2RQF5kCuuv76uKRlJ7yIqTqzPDeNXr_q4HPJkYFd8uF0I30Uf49iJyi-q_Jy1-iXr2DcJx4Hq_yPZMse55UFL0qTGEEPRWx5tPkRKwFKPWHHQwoYq-rJO9hqLdnDM7DGBV6V1lHlCRDvqmJZMrVQBa5x_Guzc5ti_jJf6160__uPnp95pU_jcgC0HjN80f7gE0zXIy-kLjnPhxn9OFu7KM4raPEZyeur2AJgYj34yGCJJLnQ9k9XjVOpuC0akD5lHt7yW20X4dfX972D5G-qEpXpUTlmmr2OyQrlL_kLdMfbmInVfvt-K84ImHmBzq0Q.5lQJAtYmn3qbamxnV3FV-A');
    // console.log(JSON.stringify(await retrieveCurrentVehicleData(response.data.access_token)));
    const vehicleDataResponse = await retrieveCurrentVehicleData(response.data.access_token);

    console.log((await getVehicleImageThumbnail(vehicleDataResponse.vehicle.vehicleId, '2019', 'Ford', '', response.data.access_token)).data);
    const location = await getVehicleLocation(vehicleDataResponse.vehicle.vehicleId, response.data.access_token);
    console.log(JSON.stringify(location.data));
    const {longitude, latitude} = location.data.vehicleLocation;
    const zip = await getZipcodeFromLatLong(latitude, longitude);
    console.log(JSON.stringify(zip.data.output[0]));
  } catch (error) {
    console.log(error);
  }
};
// callme();

exports.retrieveCurrentVehicleData = retrieveCurrentVehicleData;
