const axios = require('axios');

const advanceautopartsSearchUrl = 'https://shop.advanceautoparts.com/sch/search';

// const inventoryApiUrl = 'https://shop.advanceautoparts.com/ag/inventory?skus=11112656,15750160,14340169,12072935,10235836,10152148,10146217,14340355,12496094,12484822&locations=6604';
// axios.get(inventoryApiUrl)
// .then(function (response) {
//   // handle success
//   console.log(JSON.stringify(response.data));
// })

const buildVehicleFilter = (year, make, model, engineType) => {
  if (!!engineType && engineType.length > 0) {
      return `year:"${year.toString()}" AND make:"${make}" AND model:"${model}" AND engine:"${engineType}"`;
  }
  return `year:"${year.toString()}" AND make:"${make}" AND model:"${model}"`;
};

const buildAdvanceAutoPartsQueryParameters = (partName, year, make, model, modelType, engineType) => {
  const fullModelName = model + ' ' + modelType;
  return {
    q: partName,
    version: 'V2',
    // 'facet.multiselect=true'
    start: 0,
    rows: 1000,
    vehicle_filter: buildVehicleFilter(year.toString(), make, fullModelName),
    fields: 'PRICE,SALEPRICE,MFR,NAME,REVIEWCOUNT,REVIEWAVG,SKU,MFRPART,THUMBNAIL,SEOKEYWORD,isFitted,CORECHARGE,DESCR,SHIPPABLE,FDO,productType,PROMO_EXCLUSIONS',
    filter: 'isFitted_uFilter:1'
  };
};

const buildProductUrl = ({SEOKEYWORD, uniqueId, SKU}) => {
  const searchUrl = `https://shop.advanceautoparts.com/p`;

  return `${searchUrl}/${SEOKEYWORD}/${SKU}-P`;
};

const getProductsFromAdvanceAutoParts = ({response}) => {
  console.log(`Counted ${response.products.length} products. Expected amount ${response.numberOfProducts}`);
  // console.log(JSON.stringify(response.products));

  return response.products;
}

const isAvailableInStore = ({FDO}) => {
  if (FDO === '1') {
    //unavailable in store
    return false;
  } else if (FDO === '0') {
    return true;
  }
}

const mapAdvanceAutoPartsToStandardProductModel = (product) => {
  const thumbnailUrl = `https://shop.advanceautoparts.com/wcsstore/CVWEB/staticproductimage/${product.THUMBNAIL}`;
  const productUrl = `https://shop.advanceautoparts.com/p/${product.SEOKEYWORD}/${product.SKU}-P`;

  return {
    name: product.NAME,
    description: product.DESCR,
    partNumber: product.cleanPartNumber,
    mfrPART: product.MFRPART,
    SKU: product.SKU,
    uniqueId: product.uniqueId,
    price: product.PRICE,
    salePrice: product.SALEPRICE,
    imgUrl: thumbnailUrl,
    productUrl: productUrl
  };
};

const advanceAutoPartsScrapeParts = async ({
  year,
  make,
  model,
  modelType,
  engineType,
  partName
}, zipcode, onlyInStock) => {

  try {
    const searchUrlResponse = await axios
      .get(advanceautopartsSearchUrl,
        {
          params: buildAdvanceAutoPartsQueryParameters(partName, year, make, model, modelType, engineType)
        });

    let products = getProductsFromAdvanceAutoParts(searchUrlResponse.data);
    if (onlyInStock) {
      products = products.filter(isAvailableInStore)
    }

    const productsWithUrl = products.map((product) => {
      return {
        productUrl: buildProductUrl(product),
        ...product
      }
    });
    // console.log(JSON.stringify(productsWithUrl));
    // console.log(productsWithUrl.length);
    return productsWithUrl.map(mapAdvanceAutoPartsToStandardProductModel);
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports.advanceAutoPartsScrapeParts = advanceAutoPartsScrapeParts;
// getFordPartsByYearAndModel('BRAKE PADS', '2018', 'Ford', 'Focus', 'SE', '');
