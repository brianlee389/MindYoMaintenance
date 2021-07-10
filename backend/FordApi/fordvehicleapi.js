var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();

const vehicleId = '8a7f9fa878849d8a0179579d2f26043a';

const FordVehicleApi = class {
  const fordVehicleUrl = 'https://api.mps.ford.com/api/fordconnect/vehicles/v1';
  const apiVersion = '2020-06-01';

  constructor() {}

  GetVehicleInformationUrl(vehicleId) {
    return `${fordVehicleUrl}/${vehicleId}`;
  }

  GetVehicleList() {
    return 'fordVehicleUrl';
  }
};

var config = {
  method: 'get',
  url: 'https://api.mps.ford.com/api/fordconnect/vehicles/v1/8a7f9fa878849d8a0179579d2f26043a',
  headers: {
    'Application-Id': 'afdc085b-377a-4351-b23e-5e1d35fb3700',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlMxUEZhdzdkR2s3bHNFQmEzUjVWMnRLSzVYYnNIWEJsemFXZGhjNUVNdW8ifQ.eyJpc3MiOiJodHRwczovL2RhaDJ2YjJjcHJvZC5iMmNsb2dpbi5jb20vOTE0ZDg4YjEtMzUyMy00YmY2LTliZTQtMWI5NmI0ZjZmOTE5L3YyLjAvIiwiZXhwIjoxNjI1MzUwMDYwLCJuYmYiOjE2MjUzNDg4NjAsImF1ZCI6ImMxZTRjMWEwLTI4NzgtNGU2Zi1hMzA4LTgzNmIzNDQ3NGVhOSIsImxvY2FsZSI6ImVuIiwiaWRwIjoiYjJjX0RwSzFPQW44ZFEiLCJtdG1JZCI6IjVmMTYyMjVjLTY0M2QtNGI2OS04Mjg2LWU2ZGIyOWQ5NDk3OCIsInVzZXJHdWlkIjoiSU1kN2lScjQyUkxQZTlQQ1U4cjg3ZUxwaUFvbmhjNmRYdDIrY0p3OGZ0dEgvckJXSjQ0Qkh6c0Z6L1JFaDF4aSIsInN1YiI6IjQxMjZjMzE2LTE4ZDUtNGViYi04MDJkLTdmZTE1ZjM0YzAyMSIsIm5vbmNlIjoiMTIzNDU2Iiwic2NwIjoiYWNjZXNzIiwiYXpwIjoiMzA5OTAwNjItOTYxOC00MGUxLWEyN2ItN2M2YmNiMjM2NThhIiwidmVyIjoiMS4wIiwiaWF0IjoxNjI1MzQ4ODYwfQ.eeqZhXeVdQ4NVs--J2E2IuMPPjt2Vo4yQ-OVZCA1ypfdmgf1DJDu0rpkaRBr4_lIlAetww8VhBcrjqCfkkw63pdj5fO6lBfyIVC3pqTR7_9lnVgGeeCVW7bNxaqivgYwn-eipg_-myo4p13A4GURT6TD-z1yD_MRQW_EhjeEOs-DDC-2hFycILQgUcYWSU8IKMDmlASKf8RBat_JYQzJo9Qz7iQ76HLad5jaGeHQZgZ_B7bZ3OBb_S8TD9qW7mZ2gUZDjuSNPsi1Hy0mzANxLZcvhDHWhgu9Yx1g4Al00DwmfxS9LqushpyR4Pq0X7z4n1DR53oxRsTZXnpwMCcffA',
    'api-version': '2020-06-01'
  }
};
const generateHeader = (bearerToken, applicationId, callbackUrl, formData) => {
  return {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Application-Id': applicationdId,
    'Authorization': `Bearer ${bearerToken}`,
    'api-version': '2020-06-01',
    'callback-url': callbackUrl,
    ...formData.getHeaders()
  }
}

const generateAxiosConfig = (url, method, bearerToken, applicationId, callbackUrl, formData) => {
  return {
    method: method,
    url: url,
    headers: generateHeader(bearerToken, applicationId, callbackUrl, formData),
    data : formData
  };
}

var config = {
  method: 'post',
  url: `https://api.mps.ford.com/api/fordconnect/vehicles/v1/${vehicleId}/unlock`,
  headers: generateHeader(),
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
