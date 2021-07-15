import axios from 'axios';

export const getAvailableModelTypes = async (year, make, model) => {
  const config = {
    method: 'get',
    url: 'http://localhost:3000/vehicle/getAvailableModelTypes',
    headers: { },
    params: {
      year: year,
      make: make,
      model: model
    }
  };

  const { data } = await axios(config);
  return data;
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
};

export const selectModelType = async (selectedIndex) => {
  const queryParams = qs.stringify({
    'selectedIndex': selectedIndex
  });
  const config = {
    method: 'post',
    url: 'http://localhost:3000/vehicle/selectModelType',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : queryParams
  };

  // response: { modelId, model}
  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}

export const getEngineTypes = async (modelId) => {
  const config = {
    method: 'get',
    url: 'http://localhost:3000/vehicle/getEngineTypes',
    headers: { },
    params: {
      modelId: modelId
    }
  };

  // {
  //   "engineTypes": [
  //     {
  //         "engine": "4 Cylinders H 2.3L FI Turbo DOHC 140 CID",
  //         "count": "0",
  //         "engineId": "36524701"
  //     }
  //   ]
  // }
  const { data } = await axios(config);
  return data;
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
}
