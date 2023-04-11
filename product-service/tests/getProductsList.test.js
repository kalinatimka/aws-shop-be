import { handler } from "../handlers/getProductsList";
import * as mocks from "../mocks/products.mock";

describe("test getProductsList lambda", () => {
  it("should return response with array of products in body", async () => {
    const expectedResponse = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(mocks.products),
    };
    const spyProducts = jest.spyOn(mocks, "getProducts");

    const response = await handler();

    expect(response).toEqual(expectedResponse);
    expect(spyProducts).toHaveBeenCalled();
  });
});
