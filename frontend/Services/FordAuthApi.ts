import axios from 'axios';
import FormData from 'form-data';
import qs from 'qs';
// const fordAuthHeaderData = {
//   client_id: '30990062-9618-40e1-a27b-7c6bcb23658a',
//   client_secret: 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE',
//   redirect_uri: 'https:localhost:3000'
// };
//{ error: 'invalid_grant',
//       error_description: 'AADB2C90080: The provided grant has expired. Please re-authenticate and try again. Current time: 1626316797, Grant issued time: 1626315207, Grant expiration time: 1626315507\r\n' +
//         'Correlation ID: 675c4ad8-eb39-4b4d-9e41-852a2aac9f19\r\n' +
//         'Timestamp: 2021-07-15 02:39:57Z\r\n'
//     }
//}

export const getFordToken = async (code) => {
  try {
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
    return null;
  }
}

export const getRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    try {
      var data = new FormData();
      data.append('grant_type', 'refresh_token');
      data.append('refresh_token', refreshToken);
      data.append('client_id', '30990062-9618-40e1-a27b-7c6bcb23658a');
      data.append('client_secret', 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE');

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          resolve(this.responseText);
        }
      });

      xhr.open('POST', 'https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common');
      xhr.send(data);
    } catch (error) {
      resolve('Error retrieving accesstoken with refreshtoken.');
    }
  });


  // var formdata = new FormData();
  // formdata.append("grant_type", "refresh_token");
  // formdata.append("refresh_token", refreshToken);
  // formdata.append("client_id", "30990062-9618-40e1-a27b-7c6bcb23658a");
  // formdata.append("client_secret", "T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE");
  //
  // var requestOptions = {
  //   method: 'POST',
  //   body: formdata
  // };
  //
  // return new Promise((resolve, reject) => {
  //   fetch('https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common', requestOptions)
  //     .then(response => resolve(response))
  //     .catch(error => reject(error));
  // });
  // const formData = new FormData();
  // formData.append('grant_type', 'refresh_token');
  // formData.append('refresh_token', refreshToken);
  // formData.append('client_id', '30990062-9618-40e1-a27b-7c6bcb23658a');
  // formData.append('client_secret', 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE');
  //
  // const config = {
  //   method: 'post',
  //   url: 'https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common',
  //   headers: {
  //     'content-type': 'multipart/form-data;'
  //   },
  //   data : formData
  // };
  //
  // return axios(config);
}
