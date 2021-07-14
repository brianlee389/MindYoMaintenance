const express = require('express');
const { getEngineTypes, getModelTypes } = require('../AutozoneScraper/autozoneVehicleModelRetriever');

var router = express.Router();

let selectedVehicleDataCache = {
  recentModelTypes: [],
  selectedIndex: 0,
  selectedVehicleModel: null,
  engineTypes: [],
  selectedEngineIndex: 0,
  selectedEngine: null,
};

router.get('/getAvailableModelTypes', async (req, res) => {
  try {
    if (!req.query.year || !req.query.make || !req.query.model) {
      res.json({message: 'Missing query parameters. Ensure you have year, make, and model.'});
    }
    const modelTypes = await getModelTypes(req.query.year, req.query.make, req.query.model);
    selectedVehicleDataCache.recentModelTypes = modelTypes;
    res.json(modelTypes);
  } catch (error) {
    console.log(error);
    res.json({error: 'error retrieving model types.'});
  }
});

router.post('/selectModelType', (req, res) => {
  const selectedIndex = req.body.selectedIndex;

  if (selectedVehicleDataCache.recentModelTypes && selectedVehicleDataCache.recentModelTypes.length === 0) {
    res.json({message: 'no model information was entered.'})
  } else if (selectedVehicleDataCache.selectedIndex >= selectedVehicleDataCache.recentModelTypes.length || selectedVehicleDataCache.selectedIndex < 0) {
    res.json({message: 'invalid selected index.'});
  } else {
    selectedVehicleDataCache.selectedVehicleModel = selectedVehicleDataCache.recentModelTypes[selectedIndex];
    res.json(selectedVehicleDataCache.selectedVehicleModel);
  }
});

router.get('/getEngineTypesCache', async (req, res) => {
  try {
    if (selectedVehicleDataCache.selectedVehicleModel) {
      const engines = await getEngineTypes(selectedVehicleDataCache.selectedVehicleModel);

      if (engines.length === 0) {
        res.json({message: 'There is no engine available.'});
      } else if (engines.length === 1) {
        selectedVehicleDataCache.selectedEngine = engines[0];
        res.json({message: 'this engine was selected', engineType: selectedVehicleDataCache.selectedEngine, engineTypes: [selectedVehicleDataCache.selectedEngine]});
      } else {
        selectedVehicleDataCache.engineTypes = engines;
        res.json({engineTypes: engines});
      }
    } else {
      res.json({message: 'There is no selected model type'});
    }
  } catch (error) {
    res.json({message: 'invalid arguments for engines.'});
  }
});

router.get('/getEngineTypes', async (req, res) => {
  try {
    if (!req.query.modelId || (typeof req.query.modelId === 'string' && typeof req.query.modelId === 'number')) {
      res.json({message: 'Missing query parameters. Ensure you have modelId.'});
    }
    else {
      const engines = await getEngineTypes({modelId: req.query.modelId});
      console.log(JSON.stringify(engines));
      res.json({engineTypes: engines});
    }
  } catch (error) {
    res.json({message: 'Error retrieving engine types.'});
  }
});


router.post('/selectEngineType', (req, res) => {
  if (selectedVehicleDataCache.engineTypes && selectedVehicleDataCache.engineTypes.length === 0) {
    res.json({message: 'no model information was entered.'})
  } else if (selectedVehicleDataCache.selectedEngineIndex >= selectedVehicleDataCache.engineTypes.length || selectedVehicleDataCache.selectedEngineIndex < 0) {
    res.json({message: 'invalid selected index.'});
  } else {
    selectedVehicleDataCache.selectedEngine = selectedVehicleDataCache.engineTypes[selectedEngineIndex];
    res.json(selectedVehicleDataCache.selectedEngine);
  }
});

module.exports.vehicleTypeRouter = router;
