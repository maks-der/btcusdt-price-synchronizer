import { Test, TestingModule } from '@nestjs/testing';
import { BtcusdtPriceHistoryService } from './btcusdt-price-history.service';

describe('BtcusdtPriceHistoryService', () => {
  let service: BtcusdtPriceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BtcusdtPriceHistoryService],
    }).compile();

    service = module.get<BtcusdtPriceHistoryService>(BtcusdtPriceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
