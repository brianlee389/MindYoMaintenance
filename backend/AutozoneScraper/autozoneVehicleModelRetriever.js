const axios = require('axios');

const getModelsByYearAndMake = async (year, make) => {
  return axios
    .get(`https://www.autozone.com/ecomm/b2c/v1/ymme/models/${year}/${make}`);
  // [
  //   {
  //       "modelId": "9679190",
  //       "model": "E-350 Super Duty"
  //   }
  // ]
};
const getFordModelsByYear = async (year) => {
  return getModelsByYearAndMake(year, 'Ford');
};

const getVehicleModelEngineData = async (modelId) => {
  let config = {
    method: 'get',
    url: `https://www.autozone.com/ecomm/b2c/v1/ymme/engines/${modelId}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.5',
      'X-Requested-By': 'MF',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Sec-GPC': '1',
      'TE': 'Trailers'
    }
  };

  return axios(config);
//   [
//     {
//         "engine": "4 Cylinders 9 2.0L DI Turbo DOHC 122 CID",
//         "count": "0",
//         "engineId": "36826501"
//     }
// ]
};

const getVehicleId = async (engineId) => {
  const data = { engineID: engineId };
  const config = {
    method: 'post',
    url: 'https://www.autozone.com/ecomm/b2c/v1/currentUser/vehicles',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.5',
      'X-Requested-By': 'MF',
      'Content-Type': 'application/json;charset=utf-8',
      'Origin': 'https://www.autozone.com',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Sec-GPC': '1',
      'TE': 'Trailers',
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    },
    data : JSON.stringify(data)
  };

  return axios(config);
// responseData
//   {
//     "links": [],
//     "vehiclesInfo": [
//         {
//             "mileageRate": null,
//             "estimatedMileage": null,
//             "vehicleName": "2020 Ford Truck Edge ST AWD 2.0L DI Turbo DOHC 4cyl",
//             "color": null,
//             "preferredVehicle": true,
//             "selectMileageRate": null,
//             "year": "2020",
//             "nickName": null,
//             "catalogVehicleId": "7067802",
//             "hasRecalls": false,
//             "plateNumber": null,
//             "severeOrNormal": null,
//             "sendIntervals": null,
//             "engine": "DI Turbo DOHC",
//             "hasSpecifications": false,
//             "model": "Edge ST AWD",
//             "vin": null,
//             "hasRepairGuides": false,
//             "vehicleId": "2645513144",
//             "hasComponents": false,
//             "make": "Ford Truck"
//         }
//     ]
// }
};

const getAllModelsInYearRange = async () => {
  try {
    const years = [2018, 2019, 2020, 2021];
    const modelsPromises = [];
    let fordModels = {};
    for (let i = 0; i < years.length; i++) {
      console.log('Year ' + years[i]);
      modelsPromises.push(getFordModelsByYear(years[i].toString()));
      // const {data} = await getModelsByYear(years[i].toString());
      // fordModels[years[i]] = data;
      // // https://www.autozone.com/ecomm/b2c/v1/ymme/models/${year[i]}/Ford/
    }

    const responses = await Promise.allSettled(modelsPromises);
    console.log(responses[0].value.data);

  } catch(error) {
    console.log('Error');
    console.log(error);
  }
}

const getEngineData = async (modelId) => {
  const config = {
    method: 'get',
    url: `https://www.autozone.com/ecomm/b2c/v1/ymme/engines/${modelId}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.5',
      'DNT': '1',
      'Connection': 'keep-alive',
    }
  };

  return axios(config);
};

const retrieveAutozonePreferredVehicleId = async () => {
  // const years = [2017,2018,2019,2020, 2021];
  // for (let i = 0; i < years.length; i++) {
  //   await getFordModelsByYear(years[i]);
  //   // https://www.autozone.com/ecomm/b2c/v1/ymme/models/${year[i]}/Ford/
  // }
  await getAllModelsInYearRange();
}

const getModelTypes = async (year, make, modelName) => {
  const getModelsByYearResponse = await getFordModelsByYear(year);
  const matchingVehicleModels = getModelsByYearResponse.data.filter(({ model, modelId}) => {
    const modelLower = model.toLowerCase();
    const modelNameLower = modelName.toLowerCase();

    return modelLower.indexOf(modelNameLower) > -1 || modelNameLower.indexOf(modelLower) > -1;
  });

  return matchingVehicleModels;
};

const getEngineTypes = async (selectedModel) => {
  // get selected modelType
  // const modelTypes = getModelTypes(year, make, modelName);

  // engineDataPromises.push(getEngineData(selectedModel.modelId));

  // const engineTypeResponses = await Promise.allSettled(engineDataPromises);
  // return engineTypeResponses.map(({value}) => value);
  const engineTypes = await getEngineData(selectedModel.modelId);
  return engineTypes.data;
}

const getAllEngineTypes = async (year, make, modelName) => {
  // get selected modelType
  const modelTypes = getModelTypes(year, make, modelName);
  console.log(JSON.stringify(modelTypes));
  const engineDataPromises = [];
  for (let i = 0; i < modelTypes.length; i++) {
    engineDataPromises.push(getEngineData(modelTypes[0].modelId));
  }

  const engineTypeResponses = await Promise.allSettled(engineDataPromises);
  return engineTypeResponses.map(({value}) => value);
};

const getParts = async (year, make, modelName, modelType, partName) => {
  const getModelsByYearResponse = await getFordModelsByYear(year);
  const matchingVehicleModels = getModelsByYearResponse.data.filter(({ model, modelId}) => {
    const modelLower = model.toLowerCase();
    const modelNameLower = modelName.toLowerCase();

    if (!!modelType && modelType.length > 0) {
      return modelLower.indexOf(modelNameLower.toLowerCase()) > -1
              && modelLower.indexOf(modelType.toLowerCase());
    } else {
      return modelLower.indexOf(modelNameLower) > -1;
    }
  });

  const engineData = await getEngineData(matchingVehicleModels[0].modelId);
  const engineList = engineData.data;

  console.log(JSON.stringify(engineData.data));
  for (let engineIndex = 0; engineIndex < engineList.length; engineIndex++) {

  }
}
// retrieveAutozonePreferredVehicleId();
// getParts(2018, 'Ford', 'Edge', '', 'serpentine belt');
module.exports.getEngineTypes = getEngineTypes;
module.exports.getModelTypes = getModelTypes;
