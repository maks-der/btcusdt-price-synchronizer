import { Test, TestingModule } from '@nestjs/testing';
import { PricesService } from './prices.service';
import { EntityManager } from 'typeorm';
import { Price } from './entities/price.entity';
import { NotFoundException } from '@nestjs/common';
import { priceMock, pricesMock } from './prices.mocks';

describe('PricesService', () => {
  let pricesService: PricesService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricesService,
        {
          provide: EntityManager,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    pricesService = module.get<PricesService>(PricesService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('history()', () => {
    it('should return price history for a given currency', async () => {
      const currency = 'BTCUSDT';
      const expectedPriceHistory: Price[] = pricesMock;

      jest.spyOn(entityManager, 'find').mockResolvedValue(expectedPriceHistory);
      const result = await pricesService.history(currency);

      expect(result).toEqual(expectedPriceHistory);
      expect(entityManager.find).toHaveBeenCalledWith(Price, { where: { currency } });
    });
  });

  describe('current()', () => {
    it('should return the current price for a given currency', async () => {
      const currency = 'BTCUSDT';
      const expectedCurrentPrice: Price = priceMock;

      jest.spyOn(entityManager, 'findOne').mockResolvedValue(expectedCurrentPrice);
      const result = await pricesService.current(currency);

      expect(result).toEqual(expectedCurrentPrice);
      expect(result.currency).toEqual(expectedCurrentPrice.currency);
      expect(entityManager.findOne).toHaveBeenCalledWith(Price, {
        where: { currency },
        order: { createdAt: 'DESC' },
      });
    });

    it('should throw NotFoundException when no current price is found', async () => {
      const currency = 'InvalidCurrency';
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);
      await expect(pricesService.current(currency)).rejects.toThrowError(NotFoundException);
      expect(entityManager.findOne).toBeCalled();
    });
  });
});
