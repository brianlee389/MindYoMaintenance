import axios from 'axios';
//
// const getLatLngFromZipcode = async (zipcode) => {
//   var config = {
//     method: 'get',
//     url: `https://api.promaptools.com/service/us/zip-lat-lng/get/?key=17o8dysaCDrgv1c&zip=${zipcode}`,
//     headers: {
//       'Accept': 'application/json, text/javascript, */*; q=0.01',
//     }
//   };
//
//   return axios(config);
// }

export const getZipcodeFromLatLong = async (lat, lng) => {
  const config = {
    method: 'get',
    url: `https://api.promaptools.com/service/us/zips-inside-radius/get/?radius=10&lat=${lat.toString()}&lng=${lng.toString()}&key=17o8dysaCDrgv1c`,
    headers: {
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'en-US,en;q=0.5',
    }
  };

  return axios(config);
//   {
//     "status": 1,
//     "output": [
//         {
//             "zip": "50124",
//             "distance": 2.29
//         },
//         {
//             "zip": "50046",
//             "distance": 4.83
//         },
//         {
//             "zip": "50244",
//             "distance": 7.07
//         },
//         {
//             "zip": "50134",
//             "distance": 9.18
//         },
//         {
//             "zip": "50243",
//             "distance": 9.23
//         }
//     ]
// }
}
