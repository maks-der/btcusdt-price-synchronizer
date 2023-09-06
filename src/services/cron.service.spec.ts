import { Test, TestingModule } from '@nestjs/testing';
import { CronService } from './cron.service';
import { EntityManager } from 'typeorm';
import { ConfigService } from './config.service';

describe('CronService', () => {
  let cronService: CronService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronService,
        EntityManager,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    cronService = module.get<CronService>(CronService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('handleCron()', () => {
    it('should save prices and log currency and price', async () => {
      const mockCurrencyPrices = [{ BTCUSDT: '50000' }, { ETHUSDT: '3000' }];

      jest.spyOn(entityManager, 'save').mockResolvedValue(null);
      jest.spyOn(cronService as any, 'getPrices').mockResolvedValue(mockCurrencyPrices);
      await cronService.handleCron();

      expect(entityManager.save).toHaveBeenCalledTimes(2);
      expect(cronService['getPrices']).toHaveBeenCalled();
    });

    it('should handle errors and log them', async () => {
      jest.spyOn(cronService as any, 'getPrices').mockRejectedValue(new Error('Test error'));
      jest.spyOn(console, 'error').mockImplementation(() => {});

      await cronService.handleCron();

      expect(cronService['getPrices']).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error: Test error');
    });
  });

  describe('parseCurrencies()', () => {
    it('should parse currencies from a string', () => {
      const currenciesString = 'BTCUSDT;ETHUSDT;BNBUSDT';
      const parsedCurrencies = cronService['parseCurrencies'](currenciesString);
      expect(parsedCurrencies).toEqual(['BTCUSDT', 'ETHUSDT', 'BNBUSDT']);
    });

    it('should return an empty array when input is undefined', () => {
      const parsedCurrencies = cronService['parseCurrencies'](undefined);
      expect(parsedCurrencies).toEqual([]);
    });

    it('should return an empty array when input is an empty string', () => {
      const parsedCurrencies = cronService['parseCurrencies']('');
      expect(parsedCurrencies).toEqual([]);
    });
  });
});
