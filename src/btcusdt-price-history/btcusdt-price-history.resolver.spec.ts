import { Test, TestingModule } from '@nestjs/testing';
import { BtcusdtPriceHistoryResolver } from './btcusdt-price-history.resolver';
import { BtcusdtPriceHistoryService } from './btcusdt-price-history.service';

describe('BtcusdtPriceHistoryResolver', () => {
  let resolver: BtcusdtPriceHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BtcusdtPriceHistoryResolver, BtcusdtPriceHistoryService],
    }).compile();

    resolver = module.get<BtcusdtPriceHistoryResolver>(BtcusdtPriceHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
