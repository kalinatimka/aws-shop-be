
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');

const { handler } = require('../handlers/importProductsFile');



describe('test importProductsFile lambda', () => {
  it('should return correct response object with preSigned url', async () => {
    process.env.PRODUCTS_BUCKET = "dummy-bucket";
    process.env.FOLDER_TO_UPLOAD = "folder";

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', (a, b, callback) => {
      callback(null, 'https://test.com');
    });

    const expectedResponse = {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 200,
      body: JSON.stringify('https://test.com'),
    };

    const response = await handler({ queryStringParameters: { name: 'products.csv' } });
    expect(response).toEqual(expectedResponse);

    AWSMock.restore('S3');
  });
});