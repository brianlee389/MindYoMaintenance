// running process that keeps pulling, cron task?
// endpoint the app uses?
const playwright = require('playwright');

const mapPartsFordToStandardProductModel = ({
  name,
  partNumber,
  cleanPartNumber,
  imgUrl,
  productUrl,
  description,
  price,
}) => {
  return {
    name: name,
    description: description,
    partNumber: cleanPartNumber,
    mfrPART: cleanPartNumber,
    SKU: '',
    uniqueId: cleanPartNumber,
    price: price,
    salePrice: price,
    imgUrl: imgUrl,
    productUrl: productUrl
  };
};

const partsFordScrapeParts = async ({
    year,
    make,
    model,
    modelType,
    engine,
    partName
  }, zipcode, onlyInStock) => {
    const browser = await playwright.chromium.launch({
        headless: false, // setting this to true will not run the UI
    });
    const page = await browser.newPage();
    try {
      const fordPartsHomePage = async () => {
        await page.goto('https://parts.ford.com/en.html');

        await page.click('#noThanksButton');
        await page.click('[data-id="searchYear"]');
        await page.evaluate((year) => {
          Array.from(document.querySelectorAll('.open .text')).filter(e => e.innerText === year)[1].click();
        }, year);
        await page.waitForTimeout(1000);
        await page.click('[data-id="searchMake"]');
        await page.waitForTimeout(1000);
        const makeResults = await page.evaluate((make) => {
          const filteredResults = Array.from(document.querySelectorAll('.open .text')).filter(e => e.innerText.toLowerCase() === make.toLowerCase());
          if (filteredResults.length > 0) {
            filteredResults[0].click();
          }
          return filteredResults;
        }, make);
        if (makeResults.length === 0) {
          console.log('no makes available.');
          return [];
        }
        await page.waitForTimeout(1000);
        await page.click('[data-id="searchModel"]');
        await page.waitForTimeout(1000);
        const modelResults = await page.evaluate((model) => {
          const filteredResults = Array.from(document.querySelectorAll('.open .text')).filter(e => {
              const optionTextLower = e.innerText.toLowerCase();
              const modelNameLower = model.toLowerCase();
              return optionTextLower.indexOf(modelNameLower) > -1 || modelNameLower.indexOf(optionTextLower) > -1
          });
          if (filteredResults.length > 0) {
            filteredResults[0].click();
          }
          return filteredResults;
        }, model);

        if (modelResults.length === 0) {
          console.log('no models available.');
          return [];
        }
        await page.fill('#searchTermPartNummodel', partName);
        await page.click('#partNumButtonYMMKeyword');

        await page.fill('#autocompleteAddressHomePage', zipcode);
        await page.click('#cityGoHomePage');
        await page.waitForTimeout(3000);
        const dealerLinkElements = await page.evaluate(() => {
          const dealerLinks = document.querySelectorAll('.dealerName a');
          if (dealerLinks.length > 0) {
            dealerLinks[0].click();
          }
          return dealerLinks;
        });

        if (dealerLinkElements && dealerLinkElements.length === 0) {
          console.log('no dealers available');
          return [];
        }
      };

      const navigateToAllProductListingPage = async () => {
        const resultsUrl = await page.evaluate(async () => {
          return document.URL;
        });
        await page.goto(`${resultsUrl}&pageSize=10000&pageNumber=1`, {
            waitUntil: 'load',
            timeout: 0
        });
      };

      const parseProductListingPage = (partName) => {
        const getRobustInnerText = (element) => {
          if (element) {
            return element.innerText;
          }
          return '';
        };
        const productElements = Array.from(document.querySelectorAll('.partTile'));
        const products = productElements
          .filter((element) => {
            return getRobustInnerText(element.querySelector('.pName')).toLowerCase() === partName.toLowerCase();
          })
          .map((element) => {
            const productImgElement = element.querySelector('.partImageContainer');
            let linkTagHref = '';
            let imgTagSrc = '';
            if (productImgElement) {
              linkTagHref = productImgElement.querySelector('a').href;
              imgTagSrc = productImgElement.querySelector('.fordThumbImg').src;
            }
            const priceString = getRobustInnerText(element.querySelector('.yourPrice'));
            const indexOfDollarSign = priceString.indexOf('$')
            const partNumber = getRobustInnerText(element.querySelector('.pNumber'));

            return {
              name: getRobustInnerText(element.querySelector('.pName')),
              description: getRobustInnerText(element.querySelector('.partSectionName')),
              partNumber: partNumber,
              cleanPartNumber: partNumber.substr(8),
              imgUrl: imgTagSrc,
              productUrl: linkTagHref,
              price: Number(priceString.substr(indexOfDollarSign+1))
            }
          });

          return products;
      };

      await fordPartsHomePage();

      await page.waitForNavigation({ url: '**/shop/SearchDisplay**' });

      await navigateToAllProductListingPage();

      const productResults = await page.evaluate(parseProductListingPage, partName);

      await browser.close();

      return productResults.map(mapPartsFordToStandardProductModel);
    } catch (error) {
      console.log('Error happened in the parts.ford.com parser.');
      console.log(error);
      if (browser) {
        // browser.close();
      }
    }
}

module.exports.partsFordScrapeParts = partsFordScrapeParts;
// scrapeFordParts(partName, year, make, model, modelType, engineType);
