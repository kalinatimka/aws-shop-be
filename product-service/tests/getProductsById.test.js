import { handler } from '../handlers/getProductsById';
import { products } from '../mocks/products.mock';


describe('test getProductsById lambda', () => {
  it('should return product if correct id provided', async () => {
    const expectedResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(products[0]),
    };

    const response = await handler({ pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' } });
    expect(response).toEqual(expectedResponse);
  });

  it('should return error in incorrect id provided', async () => {
    const expectedResponse = {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify('Product not found!'),
    };

    const response = await handler({ pathParameters: { productId: 'abc' } });
    expect(response).toEqual(expectedResponse);
  });
});