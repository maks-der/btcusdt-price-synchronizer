import { Test, TestingModule } from '@nestjs/testing';
import { PricesResolver } from './prices.resolver';
import { PricesService } from './prices.service';
import { Price } from './entities/price.entity';
import { priceMock, pricesMock } from './prices.mocks';

describe('PricesResolver', () => {
  let pricesResolver: PricesResolver;
  let pricesService: PricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricesResolver,
        {
          provide: PricesService,
          useValue: {
            history: jest.fn(),
            current: jest.fn(),
          },
        },
      ],
    }).compile();

    pricesResolver = module.get<PricesResolver>(PricesResolver);
    pricesService = module.get<PricesService>(PricesService);
  });

  describe('history()', () => {
    it('should return price history for a given currency', async () => {
      const currency = 'BTCUSDT';

      const expectedPriceHistory: Price[] = pricesMock;

      jest.spyOn(pricesService, 'history').mockResolvedValue(expectedPriceHistory);
      const result = await pricesResolver.history(currency);

      expect(result).toEqual(expectedPriceHistory);
      expect(pricesService.history).toHaveBeenCalledWith(currency);
    });
  });

  describe('current()', () => {
    it('should return the current price for a given currency', async () => {
      const currency = 'ETHUSDT';
      const expectedCurrentPrice: Price = priceMock;

      jest.spyOn(pricesService, 'current').mockResolvedValue(expectedCurrentPrice);
      const result = await pricesResolver.current(currency);

      expect(result).toEqual(expectedCurrentPrice);
      expect(pricesService.current).toHaveBeenCalledWith(currency);
    });
  });
});
