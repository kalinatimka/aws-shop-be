const AWS = require('aws-sdk');
const csv = require('csv-parser')

const moveParsedFile = async (s3, record) => {
  await s3.copyObject({
    Bucket: process.env.PRODUCTS_BUCKET,
    CopySource: `${process.env.PRODUCTS_BUCKET}/${record.s3.object.key}`,
    Key: record.s3.object.key.replace('uploaded', 'parsed'),
  }).promise();
  
  await s3.deleteObject({
    Bucket: process.env.PRODUCTS_BUCKET,
    Key: record.s3.object.key,
  }).promise();
}

const sendProductToQueue = async (sqs, product) => {
  const params = {
    QueueUrl: process.env.CATALOG_ITEMS_QUEUE_URL,
    MessageBody: JSON.stringify(product),
  };

  await sqs.sendMessage(params).promise();
}

module.exports.handler = async (event) => {
  const s3 = new AWS.S3();
  const sqs = new AWS.SQS();

  for (const record of event.Records) {
    const s3Stream = s3.getObject({
      Bucket: process.env.PRODUCTS_BUCKET,
      Key: record.s3.object.key,
    }).createReadStream();

    const isCsvParsed = await new Promise((resolve, reject) => {
      s3Stream.pipe(csv(['title', 'description', 'price', 'count']))
        .on('data', (product) => {
          console.log(product)
          sendProductToQueue(sqs, product);
        })
        .on('end', (data) => { 
          console.log('data on the end: ', data);
          resolve(true);
        })
        .on("error", () => { reject(false) });
    });

    if (isCsvParsed) {
      await moveParsedFile(s3, record);

      console.log('CSV file successfully processed');
      return;
    }

    console.log('CSV parse process failed');
  }
};
