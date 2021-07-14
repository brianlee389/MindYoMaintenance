const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser');
const {vehicleTypeRouter} = require('./routes/vehicleTypeRouter');
const {partsScraperRouter} = require('./routes/partsScraperRouter');

const { getEngineTypes, getModelTypes } = require('./AutozoneScraper/autozoneVehicleModelRetriever');

const app = express();
const port = 3000;

const redis = require('redis');
const { promisify } = require('util');


const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const expireAsync = promisify(client.expire).bind(client);

app.use(morgan("common"));
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.redisClient = {
    setAsync: setAsync,
    getAsync: getAsync,
    expireAsync: expireAsync
  };
  next();
});

const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (true) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(corsOptions));

app.use('/vehicle', vehicleTypeRouter);
app.use('/parts', partsScraperRouter);

app.get('/', async (req, res) => {
  try {
    const key = 'key';
    const cacheValue = await req.redisClient.getAsync(key);
    if (cacheValue && (cacheValue.length > 2)) {
      res.json({message: cacheValue, cachehit: true});
    } else {
      await req.redisClient.setAsync(key, 'stringvalue');
      await req.redisClient.expireAsync(key, 15);
      res.json({message: 'stringvalue', cachehit: false});
    }
  } catch (error) {
    console.log(error);
    res.json({message: 'error'});
  }
});

app.listen(port, () => {
  console.log(`Parts Data API listening at http://localhost:${port}`)
});
