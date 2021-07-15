import axios from 'axios';
import qs from 'qs';

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
    url: 'http://localhost:3000/parts/fordparts',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : body
  };

  return axios(config);
};
