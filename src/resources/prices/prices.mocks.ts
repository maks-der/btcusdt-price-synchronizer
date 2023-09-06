import { Price } from './entities/price.entity';

export const priceMock: Price = {
  id: 1,
  price: 25640.35,
  currency: 'BTCUSDT',
  createdAt: new Date('2023-09-06T15:26:00.476Z'),
  updatedAt: new Date('2023-09-06T15:26:00.476Z'),
};

export const pricesMock: Price[] = [
  {
    id: 1,
    price: 25619.99,
    currency: 'BTCUSDT',
    createdAt: new Date('2023-09-06T13:50:00.515Z'),
    updatedAt: new Date('2023-09-06T13:50:00.515Z'),
  },
  {
    id: 4,
    price: 25638.49,
    currency: 'BTCUSDT',
    createdAt: new Date('2023-09-06T13:51:00.490Z'),
    updatedAt: new Date('2023-09-06T13:51:00.490Z'),
  },
  {
    id: 7,
    price: 25608.64,
    currency: 'BTCUSDT',
    createdAt: new Date('2023-09-06T13:52:00.466Z'),
    updatedAt: new Date('2023-09-06T13:52:00.466Z'),
  },
];
