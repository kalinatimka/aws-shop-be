export const handler = async (event) => {
  const { productId } = event.pathParameters;

  const products = await fetch('https://rphckujr2g.execute-api.us-east-1.amazonaws.com/dev/products');
  const parsedProducts = await products.json();

  const requestedProduct = parsedProducts.find((product) => product.id === productId);

  if (!requestedProduct) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify('Product not found!'),
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(requestedProduct),
  };
};
