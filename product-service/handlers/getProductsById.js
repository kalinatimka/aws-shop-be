
import { DynamoDB } from "aws-sdk";

import { buildResponse, failureResponse, successResponse } from "../utils/response.utils";

const dynamo = new DynamoDB.DocumentClient();

const getProductsAndStocks = async (id) => {
  const transactionResults = await dynamo.transactGet({
    TransactItems: [
      {
        Get: {
          TableName: process.env.PRODUCTS_DB_NAME,
          Key: {
            id
          }
        }
      },
      {
        Get: {
          TableName: process.env.STOCKS_DB_NAME,
          Key: {
            product_id: id
          }
        }
      }
    ]
  }).promise();

  return transactionResults.Responses;
}

export const handler = async (event) => {
  try {
    const { productId } = event.pathParameters;
    console.log('Path parameter of getProductsById lambda: ', productId);

    const [ product, stock ] = await getProductsAndStocks(productId);

    if (!product.Item || !stock.Item) {
      return buildResponse(404, 'Product not found!');
    }

    return successResponse({
      ...product.Item,
      count: stock.Item.count,
    });
  } catch (error) {
    return failureResponse(error);
  }
};
