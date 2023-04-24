const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const { name } = event.queryStringParameters;

  const s3 = new AWS.S3();

  const prom = await new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'putObject', 
      {
        Bucket: process.env.PRODUCTS_BUCKET,
        Key: `${process.env.FOLDER_TO_UPLOAD}/${name}`,
        Expires: 60,
        ContentType: 'text/csv',
      }, 
      (err, url) => {
        if (err) {
          reject(err);
        }
        resolve(url);
      }
    );
  });

  return {
    headers: { 'Access-Control-Allow-Origin': '*' },
    statusCode: 200,
    body: JSON.stringify(prom),
  };
};
