const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser')

const { partsFordScrapeParts } = require('./FordPartsScraper/fordPartsScraper');
const { advanceAutoPartsScrapeParts } = require('./AdvanceAutoPartsScraper/advanceautopartsscraper');
const { getEngineTypes, getModelTypes } = require('./AutozoneScraper/autozoneVehicleModelRetriever');

const app = express();
const port = 3000;

// Middlewares
app.use(morgan("common"));
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let selectedVehicleDataCache = {
  recentModelTypes: [],
  selectedIndex: 0,
  selectedVehicleModel: null,
  engineTypes: [],
  selectedEngineIndex: 0,
  selectedEngine: null,
};
// whitelist
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (true) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({message: 'Welcome to the parts api.'});
})
app.post('/fordparts', async (req, res) => {
  try {
    const {
      year,
      make,
      model,
      modelType,
      engine,
      partName,
      zipcode
    } = req.body
    // res.json(req.body);
    const fordParts = partsFordScrapeParts(req.body, zipcode, true);
    const advanceAutoParts = advanceAutoPartsScrapeParts(req.body, zipcode, true);

    const responses = await Promise.allSettled([fordParts, advanceAutoParts]);
    res.json({
      sources: [{
        source: 'Parts.Ford.com',
        parts: responses[0].value
      }, {
        source: 'Advance Auto Parts',
        parts: responses[1].value
      }]
    });
    res.json(responses);
  } catch (error) {
    console.log(error);
    res.json({ error: 'error parsing ford parts page.'});
  }
});

app.get('/getAvailableModelTypes', async (req, res) => {
  try {
    const modelTypes = await getModelTypes('2019', 'Ford', 'Edge');
    selectedVehicleDataCache.recentModelTypes = modelTypes;
    res.json(modelTypes);
  } catch (error) {
    console.log(error);
    res.json({error: 'error retrieving model types.'});
  }
});

app.post('/selectModelType', (req, res) => {
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

app.get('/getEngineTypes', async (req, res) => {
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


app.post('/selectEngineType', (req, res) => {
  if (selectedVehicleDataCache.engineTypes && selectedVehicleDataCache.engineTypes.length === 0) {
    res.json({message: 'no model information was entered.'})
  } else if (selectedVehicleDataCache.selectedEngineIndex >= selectedVehicleDataCache.engineTypes.length || selectedVehicleDataCache.selectedEngineIndex < 0) {
    res.json({message: 'invalid selected index.'});
  } else {
    selectedVehicleDataCache.selectedEngine = selectedVehicleDataCache.engineTypes[selectedEngineIndex];
    res.json(selectedVehicleDataCache.selectedEngine);
  }
});
app.listen(port, () => {
  console.log(`Parts Data API listening at http://localhost:${port}`)
});
