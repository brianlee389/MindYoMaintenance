const axios = require('axios');
const qs = require('qs');
const FormData = require('form-data');
const fordAuthHeaderData = {
  client_id: '30990062-9618-40e1-a27b-7c6bcb23658a',
  client_secret: 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE',
  redirect_uri: 'https:localhost:3000'
};

//{ error: 'invalid_grant',
//       error_description: 'AADB2C90080: The provided grant has expired. Please re-authenticate and try again. Current time: 1626316797, Grant issued time: 1626315207, Grant expiration time: 1626315507\r\n' +
//         'Correlation ID: 675c4ad8-eb39-4b4d-9e41-852a2aac9f19\r\n' +
//         'Timestamp: 2021-07-15 02:39:57Z\r\n'
//     }
//}
const getFordToken = async () => {
  try {
    const code = `eyJraWQiOiI2cjIzQ2FTeTF4cFdUUFBxYVRtX01Vc2RKZGo1RWlDTnRtME4yVTAxNTdFIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.k-x1sT7Hvc3ClpYkL92Wp3kmUcXy_NKSPVM5pTEUPkgF7tikkGymj9UwKPFQM1B-23QYuVIJcp5O0Afx3on-CI7LqqMkADFvCzD_3r1EHBgZ3ZXhjHFbRcsY57JIF5dVb2ictRhTEZ_QD_H6KN7KGdqKV5UMYjjbe0WZoBlSjpKA_88TQZw56gFaXfmYFrKbeam1yYWHeL__M5CLNZJgFv5fGI-FBeXYPM4-LMF6XJm7tbZyo9IpIUBm0kD5m7Tcjruy2mKrR2udlI1XRJpS2m1BSTXLiCVMxyiZSfB-DIv7zevbGzg-GE8Lxdloab1WGi9qPptyrmrPxGHFMEl3fA.fTjii8l1VcsvQh_f.JWMtD98Hn6hqyiZuXkey03vweB-w4eznwVa4AaMjlWGQNVsLSBt9F8xSzmVDy1VaCSCKdZ7XcSwaK2vs-zWz5OwyG4LxO8n5dWR6pJzKgGlSZbNHWoVIdTKDA2diPb8XeUudmHTXOMotFbCLidoqx2DV7SBDTC84cGMEyfywrPl9G9qMSgoEkBlnRLh3Ltte6pJYmnJ3QLH2YKBX_vTgk0B0FqgDrExeY6Mr9Xn2N0Qwg1AgrYqHX4_2DThTSI0b6yX1Snb0UAT2JzKSo-UlOll8KZjTQF8jjrSKMwDpRzQbw75T2glWOp3wfNn7MquYwJNIXYi_SWP0q1HLzv8sWJNjMLzrm-XSDUGpYXTkwTYV-BiGSboe7aJu36IEuyTgSeqB1_sUOmZaL0t7HjrhCR_6hks34XtL-Eu0SufMhFj6YxO_f9qBOSHVxKkcWTGWe6xH8x83wpNsry9pGq9PcxSbikuQ60_FSMsxdw3IgZ6sbO-fV3jEv17ZUNFaJP_Ca0HUtUPKufIEcARLXfc3Qmv13p44EioS-HuyK2HaK_QgGMKHpNNr88Ra88ZrBCRIy6D4NpjdqMYmBV0Q5IPF-fFpVRSxm7dr4Y85WfDc5bTqxkKvd6yhS0HEq4jfaUFjwih13Pmz_Z8Zte0mamPkcT_U6JogPHkJlBejwloBfUs3jep_18E_TaQ2fF-L9uWbISoQG-KwmLBQMWlTcmy9zRTXwlKy3V-h9AQVKj2WRm1Tke01VIPOXh8YwpnGhertTC4GIYiG9t8zVPvp7tYfm3cmbZMAi83GQpj61uTyGOtQs4uXv3QotOrXJiLWYqNptriXSgCA.IKRxll40dCmWa5Ahujgr5A`;

    // const formData = new FormData();
    // formData.append('grant_type', 'authorization_code');
    // formData.append('code', code);
    // formData.append('client_id', '30990062-9618-40e1-a27b-7c6bcb23658a');
    // formData.append('client_secret', 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE');
    // formData.append('redirect_uri', 'https:localhost:3000');
    const body = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      client_id: '30990062-9618-40e1-a27b-7c6bcb23658a',
      client_secret: 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE',
      redirect_uri: 'https:localhost:3000'
    });
    const config = {
      method: 'post',
      url: 'https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common',
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : body
    };

    return axios(config);
  } catch(error) {
      console.log(error);
  }
}

const getRefreshToken = (refreshToken) => {
  const formData = new FormData();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', refreshToken);
  formData.append('client_id', '30990062-9618-40e1-a27b-7c6bcb23658a');
  formData.append('client_secret', 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE');
  // const body = qs.stringify({
  //   grant_type: 'authorization_code',
  //   refresh_token: refreshToken,
  //   client_id: '30990062-9618-40e1-a27b-7c6bcb23658a',
  //   client_secret: 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE',
  // });

  const config = {
    method: 'post',
    url: 'https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common',
    headers: {
      ...formData.getHeaders()
    },
    data : formData
  };

  return axios(config);
}
const upperLevelFunction = async () => {
  try {
    const tokenResponse = await getFordToken();
    const refreshTokenResponse = await getRefreshToken(tokenResponse.data.refresh_token);
    console.log(tokenResponse.data.refresh_token);
    console.log(refreshTokenResponse.data.refresh_token);
  } catch (error) {
    console.log(error);
  }
};

// upperLevelFunction();
exports.getFordToken = getFordToken;
exports.getRefreshToken = getRefreshToken;
