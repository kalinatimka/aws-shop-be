import { DynamoDB } from "aws-sdk"

import { failureResponse, successResponse } from "../utils/response.utils";

const dynamo = new DynamoDB.DocumentClient();

const scanProducts = async () => {
  const scanResults = await dynamo.scan({
    TableName: process.env.PRODUCTS_DB_NAME
  }).promise();
  
  return scanResults.Items;
}

const scanStocks = async () => {
  const scanResults = await dynamo.scan({
    TableName: process.env.STOCKS_DB_NAME
  }).promise();
  
  return scanResults.Items;
}

export const handler = async (event) => {
  try {
    console.log('getProductsList lambda with no arguments executed');

    const products = await scanProducts();
    const stocks = await scanStocks();
    
    const productsWithStocks = products.map((product) => {
      const stock = stocks.find((stock) => stock.product_id === product.id);
      return {
        ...product,
        count: stock.count,
      };
    });

    return successResponse(productsWithStocks);
  } catch (error) {
    return failureResponse(error);
  }
};
