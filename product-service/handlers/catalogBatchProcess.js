import { SNS, DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamo = new DynamoDB.DocumentClient();

const putProductsAndStocks = async (productsWithId) => {
  const dbProducts = productsWithId.map(({ id, title, description, price }) => ({
    Put: {
      TableName: process.env.PRODUCTS_DB_NAME,
      Item: { id, title, description, price },
    },
  }));
  console.log("dbProducts", dbProducts);

  const dbStocks = productsWithId.map(({ id, count }) => ({
    Put: {
      TableName: process.env.STOCKS_DB_NAME,
      Item: { product_id: id, count },
    },
  }));
  console.log("dbStocks", dbStocks);

  return await dynamo.transactWrite({
    TransactItems: [
      ...dbProducts,
      ...dbStocks,
    ]
  }).promise();
};

const sendEmail = async (products) => {
  const sns = new SNS();
  return await new Promise((resolve, reject) => {
    sns.publish(
      {
        Subject: "New products added",
        Message: `${JSON.stringify(products, null, '\t')}\n\n`,
        TopicArn: process.env.CREATE_PRODUCT_TOPIC_ARN,
      },
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

export const handler = async (event) => {
  const csvProducts = event.Records.map(({ body }) => JSON.parse(body));
  console.log("products", csvProducts);

  const productsWithId = csvProducts.map((product) => ({
    id: uuidv4(),
    ...product,
  }));
  console.log("products with id", productsWithId);

  await putProductsAndStocks(productsWithId).then(() => {
    return sendEmail(productsWithId);
  }).then(() => {
    console.log("Successful added and notified");
  }).catch((err) => {
    console.log(err);
  });
};
