import axios from 'axios';
import qs from 'qs';
const apiHostName = 'https://mindyomaintenance.loca.lt';

export const getParts = async ({
  year,
  make,
  model,
  modelType,
  engineType,
  zipcode,
  partName,
}) => {
  const body = qs.stringify({
    year:  year,
    make:  make,
    model:  model,
    modelType:  modelType,
    engineType: engineType,
    zipcode:  zipcode,
    partName: partName
  });
  const config = {
    method: 'post',
    url: `${apiHostName}/parts/fordparts`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Bypass-Tunnel-Reminder': 'anything',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : body
  };

  return axios(config);
};
