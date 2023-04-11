import { DynamoDB } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

import { getBodyStatus } from "../utils/body-validator.utils";
import { failureResponse, successResponse, badRequestResponse } from "../utils/response.utils";

const dynamo = new DynamoDB.DocumentClient();

const putProductAndStock = async (product, stock) => {
  return await dynamo.transactWrite({
    TransactItems: [
      {
        Put: {
          TableName: process.env.PRODUCTS_DB_NAME,
          Item: product
        }
      },
      {
        Put: {
          TableName: process.env.STOCKS_DB_NAME,
          Item: stock
        }
      }
    ]
  }).promise();
}

export const handler = async (event) => {
  try {
    const parsedBody = JSON.parse(event.body);
    console.log('Parsed body of createProduct lambda: ', parsedBody);

    const bodyStatus = getBodyStatus(parsedBody);
    if (!bodyStatus.isValid) {
      return badRequestResponse(bodyStatus.message);
    }
  
    const { title, description, price, count } = parsedBody;
    const uuid = uuidv4();

    const product = { id: uuid, title, description, price };
    const stock = { product_id: uuid, count };

    await putProductAndStock(product, stock);

    return successResponse(`Product ${title} was created successfully! ID: ${uuid}`);
  } catch (error) {
    return failureResponse(error);
  }
};
