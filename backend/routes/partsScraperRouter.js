const express = require('express');
const { partsFordScrapeParts } = require('../FordPartsScraper/fordPartsScraper');
const { advanceAutoPartsScrapeParts } = require('../AdvanceAutoPartsScraper/advanceautopartsscraper');

var router = express.Router();

const generateScraperCacheKey = ({
  year,
  make,
  model,
  modelType,
  engine,
  partName,
  zipcode
}) => {
  return `${zipcode}|${partName}|${year}|${make}|${model}|${modelType}|${engine}`
};

router.post('/fordparts', async (req, res, next) => {
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
    if (!year || !make || !model || !partName || !zipcode) {
      // console.log(JSON.stringify(req.body));
      res.json({
        message: 'Request body has invalid parameters.',
        sources: []
      });
    }

    const cacheKey = generateScraperCacheKey(req.body);
    const partsCacheValue = await req.redisClient.getAsync(cacheKey);
    const jsonParsedCache = JSON.parse(partsCacheValue);
    if (partsCacheValue && jsonParsedCache && (partsCacheValue.length > 2)) {
      await req.redisClient.expireAsync(cacheKey, 120);
      console.log('Cache hit partsScraperRouter');
      res.json(jsonParsedCache);
    } else {
      const fordParts = partsFordScrapeParts(req.body, zipcode, true);
      const advanceAutoParts = advanceAutoPartsScrapeParts(req.body, zipcode, true);

      const responses = await Promise.allSettled([fordParts, advanceAutoParts]);

      const partResponse = {
        sources: [{
          source: 'Parts.Ford.com',
          parts: responses[0].value || []
        }, {
          source: 'AdvanceAutoParts',
          parts: responses[1].value || []
        }]
      };
      await req.redisClient.setAsync(cacheKey, JSON.stringify(partResponse));
      await req.redisClient.expireAsync(cacheKey, 60*300);
      console.log('Cache miss partsScraperRouter');
      res.json(partResponse);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: 'error parsing ford parts page.'});
  }
});

module.exports.partsScraperRouter = router;
