module.exports.handler = async (event) => {
  const { headers, methodArn } = event;
  const principalId = 'test';

  if (!headers.Authorization) {
    throw new Error('Unauthorized');
  }

  const [authType, encodedToken] = headers.Authorization.split(': ');
  console.log('auth type: ', authType);
  console.log('encoded token: ', encodedToken);

  const decodedToken = Buffer.from(encodedToken, 'base64').toString('binary');
  console.log('decoded token: ', decodedToken);

  const userToken = `${process.env.GITHUB_USERNAME}:${process.env.USER_PASSWORD}`;
  console.log('user token: ', userToken);

  console.log('envs: ', JSON.stringify(process.env));

  const policyDocument = decodedToken === userToken ? {
    'Version': '2012-10-17',
    'Statement': [
      {
        'Action': 'execute-api:Invoke',
        'Effect': 'Allow',
        'Resource': methodArn,
      }
    ]
  } : {
    'Version': '2012-10-17',
    'Statement': [
      {
        'Action': 'execute-api:Invoke',
        'Effect': 'Deny',
        'Resource': methodArn,
      }
    ]
  }
  console.log('PolicyDocument: ', JSON.stringify(policyDocument));

  const response = { policyDocument, principalId };
  console.log('Response: ', JSON.stringify(response));

  return response;
};
