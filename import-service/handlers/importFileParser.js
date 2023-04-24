const AWS = require('aws-sdk');
const csv = require('csv-parser')

module.exports.handler = async (event) => {
  const s3 = new AWS.S3();

  for (const record of event.Records) {
    const s3Stream = s3.getObject({
      Bucket: process.env.PRODUCTS_BUCKET,
      Key: record.s3.object.key,
    }).createReadStream();

    const isCsvParsed = await new Promise((resolve, reject) => {
      s3Stream.pipe(csv())
        .on('data', (data) => console.log(data))
        .on('end', async () => { resolve(true) })
        .on("error", () => { reject(false) });
    });

    if (isCsvParsed) {
      await s3.copyObject({
        Bucket: process.env.PRODUCTS_BUCKET,
        CopySource: `${process.env.PRODUCTS_BUCKET}/${record.s3.object.key}`,
        Key: record.s3.object.key.replace('uploaded', 'parsed'),
      }).promise();
      
      await s3.deleteObject({
        Bucket: process.env.PRODUCTS_BUCKET,
        Key: record.s3.object.key,
      }).promise();
      
      console.log('CSV file successfully processed');
      return;
    }

    console.log('csv parse process failed');
  }
};
