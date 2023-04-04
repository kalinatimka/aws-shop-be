import { getProducts } from "./mocks/products.mock";

export const handler = async (event) => {
  const products = await getProducts();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(products),
  };
};
