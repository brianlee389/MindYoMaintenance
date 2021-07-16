import axios from 'axios';
const apiHostName = 'http://localhost:3000';

export const getAvailableModelTypes = async (year, make, model) => {
  try {
    const config = {
      method: 'get',
      url: `${apiHostName}/vehicle/getAvailableModelTypes`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Bypass-Tunnel-Reminder': 'anything'
      },
      params: {
        year: year,
        make: make,
        model: model
      }
    };

    const { data } = await axios(config);
    return data;
  } catch (error) {
    console.log('Error calling getAvailableModelTypes.');
    console.log(error);
    return [];
  };
};

export const selectModelType = async (selectedIndex) => {
  const queryParams = qs.stringify({
    'selectedIndex': selectedIndex
  });
  const config = {
    method: 'post',
    url: `${apiHostName}/vehicle/selectModelType`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      'Bypass-Tunnel-Reminder': 'anything'
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
  try {
    const config = {
      method: 'get',
      url: `${apiHostName}/vehicle/getEngineTypes`,
      headers: {
        'Bypass-Tunnel-Reminder': 'anything',
        'Access-Control-Allow-Origin': '*'
      },
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
  } catch (error) {
    console.log('Error running getEngineTypes');
    console.log(error);
    return {engineTypes: []};
  }
}
