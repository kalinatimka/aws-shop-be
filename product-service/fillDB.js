var AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB({
  region: "us-east-1",
  accessKeyId: "",
  secretAccessKey: "",
  sessionToken: "",
});

const productsParams = {
  RequestItems: {
    products: [
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            description: { S: "Short Game Description 1" },
            price: { N: "2.4" },
            title: { S: "Game 1" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a0" },
            description: { S: "Short Game Description 2" },
            price: { N: "10" },
            title: { S: "Game 2" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a2" },
            description: { S: "Short Game Description 3" },
            price: { N: "23" },
            title: { S: "Game 3" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a1" },
            description: { S: "Short Game Description 4" },
            price: { N: "15" },
            title: { S: "Game 4" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
            description: { S: "Short Game Description 5" },
            price: { N: "23" },
            title: { S: "Game 5" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9345-fc73348a80a1" },
            description: { S: "Short Game Description 6" },
            price: { N: "15" },
            title: { S: "Game 6" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-48c5-9445-fc73c48a80a2" },
            description: { S: "Short Game Description 7" },
            price: { N: "23" },
            title: { S: "Game 7" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-45c5-9345-fc73c48a80a1" },
            description: { S: "7567ec4b-b10c-45c5-9345-fc73c48a80a1" },
            price: { N: "15" },
            title: { S: "Game 8" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            id: { S: "7567ec4b-b10c-45c5-9345-fc73c48a80a5" },
            description: { S: "Short Game Description 9" },
            price: { N: "10" },
            title: { S: "Game 9" },
          },
        },
      },
    ],
  },
};

const stocksParams = {
  RequestItems: {
    stocks: [
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
            count: { N: "4" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a0" },
            count: { N: "6" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a2" },
            count: { N: "7" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a1" },
            count: { N: "12" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
            count: { N: "7" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9345-fc73348a80a1" },
            count: { N: "8" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-48c5-9445-fc73c48a80a2" },
            count: { N: "2" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-45c5-9345-fc73c48a80a1" },
            count: { N: "3" },
          },
        },
      },
      {
        PutRequest: {
          Item: {
            product_id: { S: "7567ec4b-b10c-45c5-9345-fc73c48a80a5" },
            count: { N: "6" },
          },
        },
      },
    ],
  },
};

dynamoDB.batchWriteItem(productsParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

dynamoDB.batchWriteItem(stocksParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
