export const products = [
  {
    count: 4,
    description: "Short Game Description 1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 2.4,
    title: "Game 1",
  },
  {
    count: 6,
    description: "Short Game Description 2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    price: 10,
    title: "Game 2",
  },
  {
    count: 7,
    description: "Short Game Description 3",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
    price: 23,
    title: "Game 3",
  },
  {
    count: 12,
    description: "Short Game Description 4",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "Game 4",
  },
  {
    count: 7,
    description: "Short Game Description 5",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Game 5",
  },
  {
    count: 8,
    description: "Short Game Description 6",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "Game 6",
  },
  {
    count: 2,
    description: "Short Game Description 7",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Game 7",
  },
  {
    count: 3,
    description: "Short Game Description 8",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "Game 8",
  },
  {
    count: 6,
    description: "Short Game Description 9",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a5",
    price: 10,
    title: "Game 9",
  },
];

export function getProducts() {
  return Promise.resolve(products);
}
