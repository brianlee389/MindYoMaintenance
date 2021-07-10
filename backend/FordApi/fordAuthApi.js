var axios = require('axios');
var qs = require('qs');
var FormData = require('form-data');
var data = new FormData();

const fordAuthHeaderData = {
  client_id: '30990062-9618-40e1-a27b-7c6bcb23658a',
  client_secret: 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE',
  redirect_uri: 'https:localhost:3000'
};
const getAccessToken = async () => {
  try {
    const code = 'eyJraWQiOiI2cjIzQ2FTeTF4cFdUUFBxYVRtX01Vc2RKZGo1RWlDTnRtME4yVTAxNTdFIiwidmVyIjoiMS4wIiwiemlwIjoiRGVmbGF0ZSIsInNlciI6IjEuMCJ9.CNH7zgQ42AI5SAkZQXY5x7kbuUjnuAuLIS1CsdPrZvQt2eO8Jdyk4mVQN2wmx-ScdvXQJl-HltUsuxIwTWGbvQs-8agp72m4dQuJpHzUw8SVffJmNasO-cjW3354xQKRSDcJ0VViC3jf68ThO-Lk7jFoUEwyk6WF1fkF3Ig5CdUPCJcsDyfWcd3e8SSXPZ7YxFINHMxFxg1QGDcmihxFYP7SSi3QNBP8QtAYDgb83Wq3WBcpJQXSIO96_XHXxvIfriE8qgMlyTUXPOUL5U3ZrRYLrWe85r8leNjQESStHDMul0nMtTReL48jEvn5kfZcCTbZ52swZJw57BY4HCMRBg.hdthXpdp_1e0JIA1.xJP67QFq2X85nWRFUnM_Z-6EQWj-6fFtnzqSSnSS5jbcC_o4PfuMfcMKXXlXiMd4TzvloL_sb0u7udgt-XH4ejU99W05njk4LF432X5rRZiMM2AKKsy-hSEZizVRji4t6mIoUlZ0N_rwmkEYYZs1HJw3BSnnxpnO234SNJ9PuULY4zcF5JAgfAM5l5SMoWgTv895Te4vGYY4KpOKLsZGenHUwa6CURXdamGz3Tjye8lTtT4MoRo35Y-vGy2Jf0sg943lOV64i1R7XFChGqyl-_Ny4ITpwko9FgMgXWk5EGE39PFP9hHNOKhTcz73RE23kR-NTqHSGcaGCSqEvirx42HXJniDmB_rVxH5Zn8CcUXgMw-kIHkC7G5uWN1hQKg53XVzgRVV8TEdcj6biMbhnUzqTKLILA9dSOEDJ0y3EuWXHmpLvLrKODNxkfQejFEmctAkKibq5QDEGLf3Gc4PrRUNmtACghj3Pucsgsr7y7tCw6PzfKkAFPNbcUXaKENEauhsD8hhd_9v_GfREDy60OQsrnfak5IpdUp29QerMPAIQG5J7csp7Pq2il-e0ME-ej1q2CsmQRK_pY7K-cxoi9ZSBdwowUG6WLEHlitT4THlaKuuXgAtlJAqopA17a_jiz3qGatEYIC1O_FumkVBFzxycAJE2upXDsy7ksMxULof22nyEQeUEHpod9AX90bHDlvAw2EdgLTNU_WwwFoHLMdRH2NVy8PPvYXZQUite-xFWBZb0cJPasRV34pfN5yBi6q8pqdDP8zNMVSKDXT8Fb20nnm1xFUAUMeCdHxcB2bC-hrTs5u21nEFrDlzzOxy67rJ9f8OnJu9x8JS.e1cUqXd0JlPhccjVpeQLVg';

    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('client_id', '30990062-9618-40e1-a27b-7c6bcb23658a');
    data.append('client_secret', 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE');
    data.append('redirect_uri', 'https:localhost:3000');
    var config = {
      method: 'post',
      url: 'https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common',
      headers: {
        ...data.getHeaders()
      },
      data : data
    };

    return await axios(config);
  } catch(error) {
      console.log(error);
  }
}

const getRefreshToken = (refreshToken) => {
  var data = new FormData();
  data.append('grant_type', 'refresh_token');
  data.append('refresh_token', refreshToken);
  data.append('client_id', '30990062-9618-40e1-a27b-7c6bcb23658a');
  data.append('client_secret', 'T_Wk41dx2U9v22R5sQD4Z_E1u-l2B-jXHE');

  var config = {
    method: 'post',
    url: 'https://dah2vb2cprod.b2clogin.com/914d88b1-3523-4bf6-9be4-1b96b4f6f919/oauth2/v2.0/token?p=B2C_1A_signup_signin_common',
    headers: {
      ...data.getHeaders()
    },
    data : data
  };

  return axios(config);
}
const upperLevelFunction = async () => {
  console.log(await getAccessToken());
};

// upperLevelFunction();
exports.getAccessToken = getAccessToken;
